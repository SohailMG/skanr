import { findBestMatch } from "./BestPlaceMatch.js";
import { testData } from "./testdata.js";
import { fetchNearbyPlaces } from "./utils/placesApi.js";
import { classifyImageFromBucket } from "./utils/visionAi.js";


// Testing the accuracy of my findBestMatch algorithm against images of places
describe("Test(1) - Testing accuracy of my findBestMatch algorithm", () => {
    
    test.each(testData)("Should Match  [%s]", async (output, image) => {
      // extracting text from images
      const { fullTextAnnotation } = await classifyImageFromBucket(
        `gs://skanr-app.appspot.com/${image}`
      );
      // full text string from image
      const fullText = fullTextAnnotation.text.replace(/\n|\r/g, " ");
      console.log("[Input] Text From Image => ", fullText);
      // array of nearby places based on lat and long coordinates
      const places = await fetchNearbyPlaces();
      // results of best match
      const results = findBestMatch(places, fullText);
      // checking if best match is same as expected output
      expect(results.text).toEqual(output);
    });
})
