
/**
 * takes a string and creates ngrams based on a given size n
 * @param {string} srcStr target string to be matched against
 * @param {number} n the size of ngrams i.e. 2 -> bigrams 3-> trigrams ...etc
 * @returns {Array.<string>} array of ngrams i.e. hello -> ['he','el','ll'...]
 */
function build_n_grams(srcStr, n) {
  let n_grams = srcStr.toLowerCase().split("");
  for (let i = 0; i < n_grams.length; i++) {
    n_grams[i] = srcStr.toLowerCase().slice(i, i + n);
  }
  return n_grams;
}

function getStringSimilarity(str1, str2) {
  
    // converting both strings into ngrams 
    let n_grams1 = build_n_grams(str1, 2);
    let n_grams2 = build_n_grams(str2, 2);
    // storing number of total number of ngrams 
    let total_n_grams = n_grams1.length + n_grams2.length;
    let score = 0;
    
    for (let x = 0; x < n_grams1.length; x++) {
      for (let y = 0; y < n_grams2.length; y++) {
        // console.log(n_grams1[x], n_grams2[y]);
        if (n_grams1[x] == n_grams2[y]) {
          // console.log(n_grams1[x], n_grams2[y]);
          score++;
        }
      }
    }
    const similarityScore = (2.0 * score) / total_n_grams

    if (score > 0) return similarityScore;
    else return 0.0;
}


export function nGramSearch(places,imgFullText){
  
  let maxScore = -Infinity;
  let bestMatch = null;
  for(let place of places){
    // computing similarity score
    const score = getStringSimilarity(place.name, imgFullText);
    // updating current best match
    if(score > maxScore){
      maxScore = score;
      bestMatch = place;
    }
  }
  return {score: maxScore, bestMatch: bestMatch.name,placeId:bestMatch.place_id}
}