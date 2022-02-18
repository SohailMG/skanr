/*
    ########### String Matching Algorithm ###############
    An algorithm implemented to find the closest string from 
    two arrays e.g Array A has names of places Array B has
    text extracted from image of place banner
    Algorithm computes score of words in Array B present in name 
    of place in Array A
 */

/**
 * finds best matching string from an array of strings
 * @param {Object} places Google PlacesApi place details object
 * @param {Object} textBlocks text blocks extracted from image
 * @returns {string} matching place id
 */
function getBestMatch(places, textBlocks) {
  console.log("[BestMatch] => Computing best matching string");
  // variable to keep track of current best maximum score
  let bestScore = -Infinity;
  // variable to store matching string
  let bestPlaceMatch;
  const extractedText = textBlocks.map((block) => block.description).join(" ");
  const maxWordLength = getMaxWordLength(places);
  // looping though array of place names
  for (let place of places) {
    const currentScore = computeMatchScore(
      place.name,
      extractedText,
      maxWordLength
    );
    console.log(currentScore, place.name);
    // case 1 - Found exact match
    if (currentScore === 1) {
      bestPlaceMatch = place.name;
      break;
    }
    // case 2 - keep updating score with best matching string
    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestPlaceMatch = place.name;
    }
  }
  // Case 3 - No match is found i.e, both strings are different
  if (bestScore === 0) {
    console.log(
      "[BestMatch] => Couldn't find any matches | score = " + bestScore
    );
    return false;
  } else {
    // returning the best matching string
    console.log("[BestMatch] => Found match with score = " + bestScore);
    return bestPlaceMatch;
  }
}
/**
 *
 * @param {string} str1 name of place to be matched
 * @param {string} str2 text extracted from image to be matched against place name
 * @returns {number} score of words found in str1
 */
function computeMatchScore(str1, str2, maxWordLength) {
  // splitting both strings into array of words
  const str2Words = str2.toLowerCase().trim().split(" ");
  const str1Words = str1.toLowerCase().trim().split(" ");
  // setting initial score
  let score = 0;
  // looping through words in extracted textBlocks
  for (let word of str2Words) {
    // if word is present in string then score is increased
    if (str1.toLowerCase().includes(word.toLowerCase())) {
      score += 1;
    }
  }
  return Math.round((score / maxWordLength) * 100) / 100;
}

function getMaxWordLength(places) {
  return Math.max(...places.map((place) => place.name.split(" ").length));
}

module.exports = { computeMatchScore, getBestMatch, getMaxWordLength };
