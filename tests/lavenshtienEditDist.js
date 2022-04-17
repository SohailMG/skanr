// levenshtein edit
export const levenshteinDistance = (str1 = '', str2 = '') => {
   const matrix = Array(str2.length + 1).fill(null).map(() =>
   Array(str1.length + 1).fill(null));
   for (let i = 0; i <= str1.length; i += 1) {
      matrix[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      matrix[j][0] = j;
   }
   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         matrix[j][i] = Math.min(
            matrix[j][i - 1] + 1, // deletion
            matrix[j - 1][i] + 1, // insertion
            matrix[j - 1][i - 1] + indicator, // substitution
         );
      }
   }
   return matrix[str2.length][str1.length];
};

export function levenshtienInit(places,textFromImg){
    let maxScore = Infinity;
    let bestMatch = null;
    let results = [];
    for(let place of places){
        // computing similarity score
        const score = levenshteinDistance(place.name, textFromImg);
        results.push({ name: place.name, score });
        // updating current best match
        if(score < maxScore){
            maxScore = score;
            bestMatch = place;
        }
    }
    return {score: maxScore, bestMatch: bestMatch.name,placeId:bestMatch.place_id}
}
