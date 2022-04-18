/*
    ########### String Matching Algorithm ###############
    An algorithm implemented to find the closest string from 
    two arrays e.g Array A has names of places Array B has
    text extracted from image of place banner
    Algorithm computes score of words in Array B present in name 
    of place in Array A
 */

function tokenizeStr(str) {
  const tokens = str.toLowerCase().trim().replace(/'/g, "").split(" ");

  return tokens;
}

/**
 * finds best matching string from an array of strings
 * @param {Object} places Google PlacesApi place details object
 * @param {Object} textBlocks text blocks extracted from image
 * @returns {string} matching place id
 */
export function findBestMatch(places, extractedText) {
  // Guarding against empty strings or failed place fetches
  if (!places || !extractedText) return false;
  // variable to keep track of current best maximum score
  let bestScore = -Infinity;
  // variable to store matching string
  let bestPlaceMatch;
  // looping though array of place names
  let results =[]
  for (let place of places) {
    const currentScore = computeMatchScore(place.name, extractedText);
    // case 2 - keep updating score with best matching string
    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestPlaceMatch = place;
    }
    results.push({string:place.name, score: currentScore});
  }
  // Case 3 - No match is found i.e, both strings are different
  if (bestScore === 0) {
    console.log(
      "[BestMatch] => Couldn't find any matches | score = " + bestScore
    );
    return false;
  } else {
    // returning the best matching string
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
  if(!targetStr || !textFromImg) return 0;
  // if strings are not empty
  if (targetStr.length > 0 && textFromImg.length > 0) {
  // if strings are identical
  if (targetStr === textFromImg) return 1;
    // splitting both strings into array of words
    const targetTokens = tokenizeStr(targetStr);
    const imageTextArr = tokenizeStr(textFromImg);
    const union = targetTokens.length + imageTextArr.length;
    // setting initial score
    let score = 0.0;
    let extraScore = 0.0;
    let checkedStrStart = false;
    // looping through words in extracted textBlocks
    for (let token of targetTokens) {
      for (let i = 0; i < imageTextArr.length; i++) {
        if (imageTextArr[i] == token) {
          if (!checkedStrStart && targetTokens[0] === imageTextArr[i]) {
            extraScore += 0.5;
            checkedStrStart = true;
          }
          score++;
        }
      }
    }
    // matching score
    const matchProbability =
      (2.0 * (score + extraScore)) / (union + extraScore * 2);

    if (score > 0) return matchProbability;
  }
  return 0.0;
}
