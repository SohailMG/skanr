import { levenshtienInit } from "./utils/lavenshtienEditDist";
import { testData } from "./testdata.js";
import { fetchNearbyPlaces } from "./utils/placesApi.js";
import { classifyImageFromBucket } from "./utils/visionAi.js";


// Testing the accuracy of levenshtien against images of places
describe("Test(1) - Testing accuracy of Levenshtein Edit", () => {
  // loop test
  test.each(testData)("Should Match  [%s]",async (output,image) => {
      // const { fullTextAnnotation } = await classifyImageFromBucket(
      //   `gs://skanr-app.appspot.com/${image}`
      // );
      console.log(`gs://skanr-app.appspot.com/${image}`);
        // const fullText = fullTextAnnotation.text.replace(/\n|\r/g, " ");
        // // console.log("[Input] Text From Image => ", fullText);
        // const places = await fetchNearbyPlaces();
        // //   const results1 = findBestMatch(places, fullText)
        // const results = levenshtienInit(places, fullText);
        // expect(results.bestMatch).toEqual(output);
  });
});
   

