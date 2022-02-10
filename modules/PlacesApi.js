import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import { getBestMatch } from "./bestMatch";
const PlaceDetailsEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?`;
const PlacePhotosEndpoint = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=`;
const PlacesNearbyEndpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
const fields = [
  "name",
  "formatted_address",
  "geometry",
  "rating",
  "formatted_phone_number",
  "price_level",
  "photos",
  "reviews",
  "website",
  "user_ratings_total",
];
const radius = 1500;
const placeType = "restaurant";

/**
 *
 * @param {string} placeId
 */
export async function fetchPlaceDetails(placeId) {
  const url = urlBuilder(placeId);
  return axios
    .get(url)
    .then((response) => {
      const {
        formatted_phone_number,
        photos,
        reviews,
        name,
        rating,
        geometry,
        price_level,
        formatted_address,
        website,
      } = response.data.result;
      const newPlaceDetails = {
        name: name,
        rating: rating,
        number: formatted_phone_number,
        reviews: reviews,
        photos: photos,
        location: geometry.location,
        priceLevel: price_level,
        address: formatted_address,
        diatrey: { type: "Halal", isServed: true },
        website,
      };
      return newPlaceDetails;
    })
    .catch((error) => {
      console.error(
        "An error occurred while fetching place details",
        error.message
      );
    });
}

/**
 * building the place details url
 * @param {string} placeId
 * @returns request url
 */
function urlBuilder(placeId) {
  const encodedFields = encodeURIComponent(fields.join(","));
  const requestUrl = `${PlaceDetailsEndpoint}place_id=${placeId}&fields=${encodedFields}&key=${GOOGLE_PLACES_API_KEY}`;
  return requestUrl;
}

/**
 *
 * @param {Object} userLocation
 * @param {string} extractedText
 * @returns {Promise<string>} placeId
 */
export async function fetchNearbyPlaces(userLocation, extractedText) {
  const requestUrl = `${PlacesNearbyEndpoint}location=${userLocation.coords.latitude},${userLocation.coords.longitude}&radius=${radius}&type=${placeType}&key=${GOOGLE_PLACES_API_KEY}`;

  return axios.get(requestUrl).then((response) => {
    const places = response.data.results;
    return getBestMatch(places, extractedText);
  });
}
