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
export function findBestMatch(places, extractedText) {
  console.log("[BestMatch] => Computing best matching string");

  // Guarding against empty strings or failed place fetches
  if (!places || !extractedText) return false;
  // variable to keep track of current best maximum score
  let bestScore = -Infinity;
  // variable to store matching string
  let bestPlaceMatch;
  // looping though array of place names
  console.log(extractedText);
  for (let place of places) {
    const currentScore = computeMatchScore(place.name, extractedText);
    // case 1 - Found exact match
    if (currentScore === 1) {
      bestPlaceMatch = place.place_id;
      break;
    }
    // case 2 - keep updating score with best matching string
    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestPlaceMatch = place;
    }
    console.log({ currentScore, place: place.name });
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
    return {
      text: bestPlaceMatch.name,
      placeId: bestPlaceMatch.place_id,
      score: bestScore,
    };
  }
}
/**
 *
 * @param {string} textFromImg name of place to be matched
 * @param {string} targetStr text extracted from image to be matched against place name
 * @returns {number} score of best possible match for text from image
 */
export function computeMatchScore(targetStr, textFromImg) {
  // splitting both strings into array of words
  const targetStrWords = targetStr
    .toLowerCase()
    .trim()
    .replace(/'/g, "")
    .split(" ");
  const imageTextArr = textFromImg
    .toLowerCase()
    .trim()
    .replace(/'/g, "")
    .split(" ");
  // setting initial score
  let score = 0;
  let extraScore = 0;
  let checkedStrStart = false;
  // looping through words in extracted textBlocks
  for (let word of targetStrWords) {
    // Case 1 - returning score once a match is found
    if (checkedStrStart && score > targetStrWords.length) break;
    // Case 2 - adding extra score for strings starting with text from image
    if (!checkedStrStart && imageTextArr.includes(targetStrWords[0])) {
      score += 1;
      extraScore += 1;
      checkedStrStart = true;
    }
    // Case 3 - checking when text is present in target string
    if (imageTextArr.includes(word.toLowerCase())) score += 1;
  }

  if (score === 0) return 0;
  // console.log(score,targetStrWords.length)
  // dividing score by (number of words in target string + extra score)
  const matchPercentage = (
    score /
    (targetStrWords.length + extraScore)
  ).toFixed(2);

  return matchPercentage;
}

// module.exports = { computeMatchScore, findBestMatch };
