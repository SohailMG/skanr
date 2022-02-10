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
export function getBestMatch(places, textBlocks) {
  // variable to keep track of current best maximum score
  let bestScore = -Infinity;
  // variable to store matching string
  let bestPlaceMatch;
  // looping though array of place names
  for (let place of places) {
    // looping through array of extracted textBlocks from image
    for (let textBlock of textBlocks) {
      const placeName = place.name.toLowerCase().trim();
      const extractedText = textBlock.description.toLowerCase().trim();
      // Case 1 - Empty text extracted
      if (!placeName || !extractedText) continue;
      let currentMatchScore = computeMatchScore(placeName, extractedText);
      // Case 2 - Both string are identical
      if (currentMatchScore === 1) return place.place_id;
      // updating best matching score
      if (currentMatchScore > bestScore) {
        bestScore = currentMatchScore;
        bestPlaceMatch = place;
      }
    }
  }
  // Case 3 - No match is found i.e, both strings are different
  if (bestScore === 0) {
    console.error("No match found");
    return false;
  } else {
    // returning the best matching string
    return bestPlaceMatch;
  }
}
/**
 *
 * @param {string} str1 name of place to be matched
 * @param {string} str2 text extracted from image to be matched against place name
 * @returns {number} score of words found in str1
 */
function computeMatchScore(str1, str2) {
  // splitting both strings into array of words
  const str2Words = str2.toLowerCase().trim().split(" ");
  const str1Words = str1.toLowerCase().trim().split(" ");
  // setting initial score
  let score = 0;
  // looping through words in extracted textBlocks
  for (let word of str2Words) {
    // if word is present in string then score is increased
    if (str1.toLowerCase().includes(word.toLowerCase())) {
      score += 10;
    }
  }
  return score / (str1Words.length * 10);
}
