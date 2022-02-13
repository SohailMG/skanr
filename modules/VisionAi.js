import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { foodLabels, foodTypes } from "../foodLabels";
import { storeLabelledImages } from "../controllers/db-controllers";

const apiRequest = {
  url: "https://vision.googleapis.com/v1/images:annotate?key=",
  apiKey: GOOGLE_PLACES_API_KEY,
  reqBody: {
    requests: [
      {
        image: {
          content: null,
        },
        features: [
          {
            maxResults: 10,
            type: "LABEL_DETECTION",
          },
          {
            maxResults: 4,
            type: "DOCUMENT_TEXT_DETECTION",
          },
        ],
      },
    ],
  },
};
/**
 *
 * @param {base64} base64
 * @returns {Promise<Array<object>>} array of detected features
 */
export async function classifyImage(base64) {
  apiRequest.reqBody.requests[0].image.content = base64;
  return await fetch(apiRequest.url + apiRequest.apiKey, {
    method: "POST",
    body: JSON.stringify(apiRequest.reqBody),
  }).then(
    (response) => {
      return response.json();
    },
    (err) => {
      console.log("Failed to classify image ", err);
    }
  );
}

// resize image to cloud vision's preference 640x640
export async function resizeImage(image) {
  const resizedImgObject = await ImageManipulator.manipulateAsync(
    image.localUri || image.uri || image,
    [{ resize: { width: 500, height: 500 } }],
    { compress: 0, format: ImageManipulator.SaveFormat.JPEG }
  );
  // converting raw image to base64
  const base64 = await FileSystem.readAsStringAsync(resizedImgObject.uri, {
    encoding: "base64",
  });
  return base64;
}

// classify batch of images
export async function classifyBatchOfImages(images, placeId) {
  console.log("[VisionAi] => Classifying batch of images");
  const labelledImages = [];
  for (let image of images) {
    const base64 = await resizeImage(image.src);
    const response = await classifyImage(base64);
    const labels = response.responses[0].labelAnnotations;
    const imgLabels = [];
    // extracting labels
    labels.forEach((label) => {
      imgLabels.push("general");
      if (foodLabels.includes(label.description)) {
        imgLabels.push(label.description);
      }
    });
    if (imgLabels.length > 0)
      labelledImages.push({ imageUri: image.src, labels: imgLabels });
  }
  console.log(labelledImages);
  const response = await storeLabelledImages(labelledImages, placeId);
  return labelledImages;
}
