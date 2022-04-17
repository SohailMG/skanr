// import * as testStrings from "./testStrings.js"
// import {performance} from "perf_hooks"
// import {bookTitlesDataset, writeToFile} from "./fileReader.js"
function tokenizeStr(str) {
  const filteredStr = str.toLowerCase().trim();
  const strNgram = filteredStr.split(" ");
  return strNgram;
}

function stringSimilarity(source, target) {
  // memo to keep track of already matched words
  const memo = {};
  // array of words from both source and target
  const srcTokens = tokenizeStr(source);
  const trgtTokens = tokenizeStr(target);

  let score = 0;
  let extraScore = 0;
  let checkedStart = false;
  // comparing words from both source and target
  for (let i = 0; i < srcTokens.length; i++) {
    for (let j = 0; j < trgtTokens.length; j++) {
      // case 1 skip when a word is already been found
      if (memo[srcTokens[i]]) continue;
      // case 2 extra score when target starts with word from source
      if (!checkedStart && trgtTokens[i] == srcTokens[0]) {
        memo[srcTokens[0]] = true;
        checkedStart = true;
        extraScore++;
      }
      // case 3 when two words are equal
      if (srcTokens[i] === trgtTokens[j]) {
        memo[srcTokens[i]] = true;
        score++;
      }
    }
    // checking if every word from string has already been found
    const foundMatch = srcTokens.every((word) => memo[word] == true);
    if (foundMatch)
      return {
        score: score / (trgtTokens.length + extraScore),
        exact: foundMatch,
      };
  }

  return {
    score: score / (trgtTokens.length + extraScore),
    source,
  };
}

export function findBestMatch(places, imgFullText) {
  console.log("Started best match algorithm");
  let bestMatch = null;
  let bestScore = -Infinity;

  for (let place of places) {
    const results = stringSimilarity(place.name, imgFullText);
    console.log("MATCH => ", results);
    if (results.score > bestScore) {
      bestScore = results.score;
      bestMatch = place;
    }
  }
  return {
    score: bestScore,
    bestMatch: bestMatch.name,
    placeId: bestMatch.place_id,
  };
}

// console.log(bestMatch,maxScore);
