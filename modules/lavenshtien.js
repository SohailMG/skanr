/*
          ***Levenshtein Edit Distance Algorithm***
  computes the edit distance of converting string A to string B
  using a dynamic programming approach for faster performance
*/

let matrix = [];
const LevenshteinDist = (str1, str2) => {
  str1.toLowerCase();
  str2.toLowerCase();
  initMatrix(str1, str2);
  return calcEdit(str1, str2);
};
/**
 * computes the edit distance needed for each
 * char of str1 and str2
 * @param {string} str1
 * @param {string} str2
 * @returns the final edit distance value to convert str1 to str2
 */
function calcEdit(str1, str2) {
  // skipping 0th pos as it contains empty string
  for (let i = 1; i < str1.length + 1; i++) {
    for (let j = 1; j < str2.length + 1; j++) {
      // checking if current chars of str1 and str2 are equal
      if (str1[i - 1] === str2[j - 1]) {
        /* setting the current matrix value to the 
        catty corner value of the previous iteration */
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        /* when not equal , get the min value of all three cells*/
        matrix[i][j] = getMinValue(i, j);
      }
    }
  }
  // returning the final edit distance value
  return matrix[str1.length][str2.length];
}
/**
 * a helper function to get the minimum value
 * of left top and topleft cells of current cell
 * @param {number} i current row position
 * @param {number} j current colum position
 * @returns the minimum value of all three adjecent cells
 */
function getMinValue(i, j) {
  // cell left to the current cell
  const leftNeighbor = matrix[i - 1][j];
  // cell right above the current cell
  const topNeighbor = matrix[i][j - 1];
  // cell top left of the current cell
  const topLeftNeighbor = matrix[i - 1][j - 1];
  // returning the minimum value of all three cells
  return 1 + Math.min(leftNeighbor, topLeftNeighbor, topNeighbor);
}

// initialises the 2d matrix with default values
function initMatrix(str1, str2) {
  for (let i = 0; i < str1.length + 1; i++) {
    const row = [];
    for (let j = 0; j < str2.length + 1; j++) {
      row.push(j);
    }
    row[0] = i;
    matrix.push(row);
  }
}
/**
 * loops through array of strings and compares
 * each string with target string using levenshtein edit distance
 * @returns best matching string with minmum edit distance
 */
export function getBestMatch(places, textBlocks) {
  let bestMatch;
  let minVal = Infinity;
  for (let place of places) {
    for (let text of textBlocks) {
      let currentMin = LevenshteinDist(text, place);
      console.log(currentMin);
      if (currentMin < minVal) {
        minVal = currentMin;
        bestMatch = place;
      }
    }
  }
  console.log(bestMatch);
  return bestMatch;
}

const places = [
  "Western periperi& schawarma",
  "Chicken Cottage",
  "Hot Rooster",
  "Cheatmeals - Rayners lane",
  "Freshly Grilled Peri Peri Chicken",
];
const textBlocks = [
  "grilled",
  "freshly grilled",
  "Hot Rooster",
  "freshly",
  "fant and we",
  "fant",
];

getBestMatch(places, textBlocks);
