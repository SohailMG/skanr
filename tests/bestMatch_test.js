const {
  computeMatchScore,
  getBestMatch,
  getMaxWordLength,
} = require("../modules/bestMatch");

const places = [
  { place_id: 1, name: "Western periperi& schawarma" },
  { place_id: 2, name: "Chicken Cottage" },
  { place_id: 3, name: "Hot Rooster" },
  { place_id: 4, name: "Cheatmeals - Rayners lane" },
  { place_id: 4, name: "taste of lahore" },
  { place_id: 4, name: "freshly grilled peri peri chicken" },
];
const textBlocks = [
  { description: "hot" },
  { description: "chicken" },
  { description: "sales" },
  { description: "roost" },
  { description: "rooster" },
  { description: "fant" },
];

const str2 = "winter wonderland";

console.time("getBestMatch");
const bestMatch = getBestMatch(places, textBlocks);
console.timeEnd("getBestMatch");
console.log(bestMatch);
