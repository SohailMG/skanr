import { levenshtienInit } from "./lavenshtienEditDist.js";
import { testData } from "./testdata.js";
import { fetchNearbyPlaces } from "./utils/placesApi.js";
import { classifyImageFromBucket } from "./utils/visionAi.js";
import { findBestMatch } from "./BestPlaceMatch.js";
import { nGramSearch } from "./nGramSearch.js";

const algorithms = [
  {
    name: "Levenshtein",
    passes: 0,
    fails: 0,
    avgTime: [],
  },
  { name: "BestPlaceMatch", passes: 0, fails: 0, avgTime: [] },
  { name: "nGrams", passes: 0, fails: 0, avgTime: [] },
];

const totalTests = testData.length;
async function measureLevenshtien() {
  console.log("[Test] Measuring Performance of Levenshtein Edit Algorithm");
  for (let test of testData) {
    const start = clock();
    const [output, image] = test;
    const { fullTextAnnotation } = await classifyImageFromBucket(
      `gs://skanr-app.appspot.com/${image}`
    );
    const fullText = fullTextAnnotation.text.replace(/\n|\r/g, " ");
    // console.log("[Input] Text From Image => ", fullText);
    const places = await fetchNearbyPlaces();
    //   const results1 = findBestMatch(places, fullText)
    const results = levenshtienInit(places, fullText);
    if (results.bestMatch === output) {
      algorithms[0].passes++;
    } else {
      algorithms[0].fails++;
    }
    const end = clock(start);
    algorithms[0].avgTime.push(end);
  }
}
async function measureBestPlaceMatch() {
  console.log("[Test] Measuring Performance of My BestPlaceMatch Algorithm");
  for (let test of testData) {
    const start = clock();
    const [output, image] = test;
    const { fullTextAnnotation } = await classifyImageFromBucket(
      `gs://skanr-app.appspot.com/${image}`
    );
    const fullText = fullTextAnnotation.text.replace(/\n|\r/g, " ");
    // console.log("[Input] Text From Image => ", fullText);
    const places = await fetchNearbyPlaces();
    //   const results1 = findBestMatch(places, fullText)
    const results = findBestMatch(places, fullText);
    if (results.text === output) {
      algorithms[1].passes++;
    } else {
      algorithms[1].fails++;
    }
    const end = clock(start);
    algorithms[1].avgTime.push(end);
  }
}
async function measureNGram() {
  console.log("[Test] Measuring Performance of n-grams Search Algorithm");
  for (let test of testData) {
    const start = clock();
    const [output, image] = test;
    const { fullTextAnnotation } = await classifyImageFromBucket(
      `gs://skanr-app.appspot.com/${image}`
    );
    const fullText = fullTextAnnotation.text.replace(/\n|\r/g, " ");
    // console.log("[Input] Text From Image => ", fullText);
    const places = await fetchNearbyPlaces();
    //   const results1 = findBestMatch(places, fullText)
    const results = nGramSearch(places, fullText);
    if (results.bestMatch === output) {
      algorithms[2].passes++;
    } else {
      algorithms[2].fails++;
    }
    const end = clock(start);
    algorithms[2].avgTime.push(end);
  }
}


(async () => {
  await measureNGram();
  await measureBestPlaceMatch();
  await measureLevenshtien();
  algorithms.forEach(alg=> alg.avgTime = alg.avgTime.reduce((a,b)=>a+b)/alg.avgTime.length);
  const results = algorithms.map(algo=>({
      ...algo,accuracy:(algo.passes/totalTests * 100).toFixed(2) + "%"
    }))
    console.table(results);

})();

function clock(start) {
  if (!start) return process.hrtime();
  let end = process.hrtime(start);
  return Math.round(end[0] * 1000 + end[1] / 1000000);
}
