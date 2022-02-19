import { classifyImageFromBucket } from "./utils/visionAi.js";
import { computeMatchScore, findBestMatch } from "../modules/bestMatch.js";
import { fetchNearbyPlaces } from "./utils/placesApi.js";
import { performance } from "perf_hooks";
/* testing if findBestMatch algorithm returns the currect place
name based on text extracted from images of restaurant front view  */
describe("Test(1) - Image of [Cheatmeals Rayners lane] restaurant front", () => {
  it("Should match string [Cheatmeals Rayners lane]", async () => {
    const { fullTextAnnotation } = await classifyImageFromBucket(
      "gs://skanr-app.appspot.com/cheat-meals.png"
    );
    // joining extracted text blocks into a single string
    const fullText = fullTextAnnotation.text.split("\n").join(" ");
    // fetching nearby places based on coordinates
    const places = await fetchNearbyPlaces(fullText);
    // finding best match for place name and text from image
    const { text } = findBestMatch(places, fullText);
    expect(text).toEqual("Cheatmeals Rayners lane");
  });
});

describe("Test(2) - Algorithm Performance Test", () => {
  it("Performance should be less than 4 seconds", async () => {
    const start = performance.now();
    const { fullTextAnnotation } = await classifyImageFromBucket(
      "gs://skanr-app.appspot.com/cheat-meals.png"
    );
    // joining extracted text blocks into a single string
    const fullText = fullTextAnnotation.text.split("\n").join(" ");
    // fetching nearby places based on coordinates
    const places = await fetchNearbyPlaces(fullText);
    // finding best match for place name and text from image
    const timelapsed = (performance.now() - start) / 1000;
    expect(timelapsed).toBeLessThan(4);
  });
});

describe("Test(2) - Image of [Bamboo House] restaurant front", () => {
  it("Should match string [Bamboo House]", async () => {
    const { fullTextAnnotation } = await classifyImageFromBucket(
      "gs://skanr-app.appspot.com/bamboo-house.png"
    );
    // joining extracted text blocks into a single string
    const fullText = fullTextAnnotation.text.split("\n").join(" ");
    // fetching nearby places based on coordinates
    const places = await fetchNearbyPlaces(fullText);
    // finding best match for place name and text from image
    const { text } = findBestMatch(places, fullText);
    expect(text).toEqual("Bamboo House");
  });
});

/**
 * testing the accuracy of computeMatchScore method
 * Test 1 - when words in target string are all present in text extracted from
 * image
 * Test 2 - when words in target string are not present in text extracted from
 */
describe("Test(3) - Testing accuracy of computeMatchScore", () => {
  it("Should return 1 for exact match for target string", () => {
    const target = "Bamboo House";
    const textFromImg = "house bamboo sale 123 io test boo ba ho hous";
    const matchScore = computeMatchScore(target, textFromImg);
    expect(matchScore).toEqual(1);
  });
  it("Should return 1 for exact match for target string", () => {
    const target = "Bamboo House";
    const textFromImg = "chicken open price welcome hello street";
    const matchScore = computeMatchScore(target, textFromImg);
    expect(matchScore).toEqual(0.0);
  });
});

describe("Test(4) - Testing accuracy of computeMatchScore for close strings", () => {
  const targets = ["Bamboo House", "Steak House", "Chicken Cottage"];
  const textFromImg = "house bamboo sale 123 io test boo ba ho hous";
  it("Should return 1 for exact match for target string", () => {
    // Test 1 Bamboo House - returns 1 for best match
    const matchScore1 = computeMatchScore(targets[0], textFromImg);
    expect(matchScore1).toEqual(1);
  });
  it("Should return 0.5 for half words found in text from image", () => {
    // Test 2 Steak House - returns 0.5 half words found in text from image
    const matchScore2 = computeMatchScore(targets[1], textFromImg);
    expect(matchScore2).toEqual(0.5);
  });
  it("Should return 0 when no words found in text from image", () => {
    // Test 1 Chicken Cottage - returns 0 when no words found in image text
    const matchScore3 = computeMatchScore(targets[2], textFromImg);
    expect(matchScore3).toEqual(0);
  });
});
