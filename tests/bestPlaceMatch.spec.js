import { findBestMatch,computeMatchScore } from "./utils/BestPlaceMatch.js";
import { testData } from "./testdata.js";
import { fetchNearbyPlaces } from "./utils/placesApi.js";
import { classifyImageFromBucket } from "./utils/visionAi.js";


// // Testing the accuracy of my findBestMatch algorithm against images of places
// describe("Test(1) - Testing accuracy of my findBestMatch algorithm", () => {
//     // looping through array of test data
//     test.each(testData)("Should Match  [%s] For Image [%s]", async (output, image) => {
//       // extracting text from images
//       const { fullTextAnnotation } = await classifyImageFromBucket(
//         `gs://skanr-app.appspot.com/${image}`
//       );
//       // full text string from image
//       const fullText = fullTextAnnotation.text.replace(/\n|\r/g, " ");
//       // console.log("[Input] Text From Image => ", fullText);
//       // array of nearby places based on lat and long coordinates
//       const places = await fetchNearbyPlaces();
//       // results of best match
//       const results = findBestMatch(places, fullText);
//       // checking if best match is same as expected output
//       expect(results.text).toEqual(output);
//     });
// })

describe('Test(2) - Testing computeMatchScore', () => {
  it('Should Return 1 For Exact Match', () => {
    const score = computeMatchScore('Bamboo House', 'Bamboo House');
    expect(score).toEqual(1);
  });
  it('Should Return 0 For Missing/Undefined Argument', () => {
    const score1 = computeMatchScore('Bamboo House');
    const score2 = computeMatchScore();
    expect(score1).toEqual(0);
    expect(score2).toEqual(0);
  });
  it('Should Return Higher Score for score1', () => {
    const score1 = computeMatchScore("Bamboo House","bamboo house");
    const score2 = computeMatchScore("Bamboo House","bamboo chicken house");
    expect(score1).toBeGreaterThan(score2);
  });
  it('Should Return 0 For No Match Found', () => {
    const score = computeMatchScore("Bamboo House","Burger King" );
    expect(score).toEqual(0);
  });
  it('Should Return 0 When Both Strings Are Empty', () => {
    const score = computeMatchScore("","");
    expect(score).toEqual(0);
  });
  it('Should Return True For Flipped Strings', () => {
    const score1 = computeMatchScore("Bamboo House","Bamboo House"
    );
    const score2 = computeMatchScore("Bamboo House","House Bamboo"
    );
    expect(score1).toEqual(score2);
  });
});

