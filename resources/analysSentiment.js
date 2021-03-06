import { SENTIMENT_API_KEY } from "@env";

export const analyseReviews = async (reviews) => {
  let reviewBlock = "";
  reviews.slice(0, 10).forEach((review) => {
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

export const analyseSentiment = async (sentiment) => {
  const tags = [
    { name: "Very Positive", tag: "P+", color: "#21B15C" },
    { name: "Positive", tag: "P", color: "#71C693" },
    { name: "Neutral", tag: "NEU", color: "#FF9900" },
    { name: "Negative", tag: "N", color: "#F46161" },
    { name: "Very Negative", tag: "N+", color: "#F11010" },
  ];
  const sentimentSet = new Set();
  tags.forEach(({ tag, color, name }) => {
    const count = sentiment.sentimentArr.reduce(
      (acc, cur) => (cur.score_tag === tag ? ++acc : acc),
      0
    );
    const sentPercentage = (count / 100) * tags.length;
    sentimentSet.add({
      name,
      count,
      color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    });
  });
  return sentimentSet;
};
