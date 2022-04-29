import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(
    "/Users/sohailgsais/ThirdYear/FinalProject/project-build/skanr-app/.env"
  ),
});


const apiRequest = {
  url: "https://vision.googleapis.com/v1/images:annotate?key=",
  apiKey: process.env.GOOGLE_PLACES_API_KEY,
  reqBody: {
    requests: [
      {
        image: {
          source: {
            imageUri: "",
          },
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

export async function classifyImageFromBucket (gcImageUri){
     apiRequest.reqBody.requests[0].image.source.imageUri = gcImageUri;
     try{
         const response = await fetch(apiRequest.url + apiRequest.apiKey, {
             method: "POST",
             body: JSON.stringify(apiRequest.reqBody),
            })
            const data = await response.json();
            // const {labelAnnotations,fullTextAnnotation} = data[0]
            return data.responses[0]
    }catch(err){
        console.log("Failed to classify ",err)
    }
    //  console.log(data.response[0].error);
}


// module.exports = {classifyImageFromBucket}
