import { GOOGLE_PLACES_API_KEY } from "@env";

export default API = {
  url: "https://vision.googleapis.com/v1/images:annotate?key=",
  apiKey: GOOGLE_PLACES_API_KEY,
  reqBody: {
    requests: [
      {
        image: {
          content: "base64",
        },
        features: [
          {
            maxResults: 4,
            type: "DOCUMENT_TEXT_DETECTION",
          },
          {
            maxResults: 10,
            type: "LABEL_DETECTION",
          },
        ],
      },
    ],
  },
};
