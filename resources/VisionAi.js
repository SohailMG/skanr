import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { foodLabels, foodTypes } from "../foodLabels";
import {
  addLabelsToDataset,
  getFoodLabels,
  storeLabelledImages,
} from "../controllers/dbHandlers";

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
  console.log("[Vision Ai] => Classify Image");
  try {
    apiRequest.reqBody.requests[0].image.content = base64;
    return await fetch(apiRequest.url + apiRequest.apiKey, {
      method: "POST",
      body: JSON.stringify(apiRequest.reqBody),
    }).then(
      (response) => {
        // console.log(response);
        return response.json();
      },
      (err) => {
        console.log("[Vision Ai] => Failed to classify image ", err);
        return false;
      }
    );
  } catch (error) {
    console.log("[Vision Ai] => Failed to calssifyt image ", error);
  }
}

// resize image to cloud vision's preference 640x640
export async function resizeImage(image) {
  try {
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
  } catch (error) {
    console.error("[Vision Ai] => Failed ", error);
  }
}

// classify batch of images
export async function classifyBatchOfImages(images, placeId) {
  console.log("[VisionAi] => Classifying batch of images");
  const labelledImages = [];
  for (let image of images) {
    const base64 = await resizeImage(image.src);
    const response = await classifyImage(base64);
    const labels = response.responses[0].labelAnnotations;
    const dataset = await getFoodLabels();

    const imgLabels = [];
    // extracting labels
    labels.forEach((label) => {
      imgLabels.push("general");
      if (label.description.toLowerCase() === "menu")
        imgLabels.push(label.description);
      if (dataset.includes(label.description) && label.score > 0.7) {
        imgLabels.push(label.description);
      }
    });
    if (imgLabels.length > 0)
      labelledImages.push({ imageUri: image.src, labels: imgLabels });
  }
  await storeLabelledImages(labelledImages, placeId);
  // adding new labels to dataset
  // await addLabelsToDataset(labels);
  return labelledImages;
}

/**
 * classifies place images to retrive image of possible outdoor view
 * @param {*} images
 * @param {*} placeId
 * @returns
 */
export const classifyPlaceOutdoorImage = async (images, placeId) => {
  try {
    console.log("[VisionAi] => Classifying for Outdoor Image");
    const possibleLabels = [
      "outdoor",
      "building",
      "street",
      "shop",
      "Fixture",
      "Property",
    ];
    let outDoorImg = "";
    for (let image of images) {
      const base64 = await resizeImage(image.src);
      const response = await classifyImage(base64);
      const labels = response.responses[0].labelAnnotations;
      // console.log(labels);
      // extracting labels
      labels.forEach((label) => {
        // Case 1 - Best match found
        if (label.description.toLowerCase() == "street") {
          console.log(
            "[VisionAi] => Detected outdoor Image showing " + label.description
          );
          outDoorImg = image.src;
          return outDoorImg;
        } else if (possibleLabels.includes(label.description.toLowerCase())) {
          console.log(
            "[VisionAi] => Detected outdoor Image showing " + label.description
          );
          outDoorImg = image.src;
          return outDoorImg;
        }
      });
    }
    return outDoorImg;
  } catch (error) {
    console.error(error);
  }
};
