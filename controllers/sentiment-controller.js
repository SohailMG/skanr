import { SENTIMENT_API_KEY } from "@env";

export const analyseReviews = async (reviews) => {
  let reviewBlock = "";
  reviews.slice(0, 5).forEach((review) => {
    const { text } = review;
    reviewBlock += text + " . ";
  });
  const formdata = new FormData();
  formdata.append("key", SENTIMENT_API_KEY);
  formdata.append("lang", "en");
  formdata.append("model", "general");
  formdata.append("txt", reviewBlock);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const { score_tag, sentence_list } = result;
      let sentimentArr = [];
      for (let sentenceBlock of sentence_list) {
        const { segment_list } = sentenceBlock;
        for (let segment of segment_list) {
          const { text, score_tag } = segment;
          sentimentArr.push({ text: text, score_tag: score_tag });
        }
      }
      return { sentimentArr, score_tag };

      // console.log(sentence_list[0]["segment_list"][0]["text"]);
    })
    .catch((error) => console.log("error", error));
};
