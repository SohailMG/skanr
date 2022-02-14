import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import { getBestMatch } from "./bestMatch";

// Google PlacesApi Endpoints
const PlaceDetailsEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?`;
const PlacePhotosEndpoint = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=`;
const PlacesNearbyEndpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
const ReverseGeocodeEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?`;
// Google PlacesApi Response Properties
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
        placeId,
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

/**
 * fetches images of place using photo refrence object
 * @param {Object} placeDetails google place details object
 * @returns {Array<string>} array of image uris
 */
export async function fetchPlaceImages(placeDetails) {
  const promises = [];
  placeDetails.photos.slice(0, 10).forEach(({ photo_reference }) => {
    promises.push(
      axios.get(
        PlacePhotosEndpoint + photo_reference + "&key=" + GOOGLE_PLACES_API_KEY
      )
    );
  });
  return Promise.all(promises).then((responses) => {
    const photoUrls = [];
    responses.forEach((response, index) => {
      const photoUrl = response.request.responseURL;
      photoUrls.push({ src: photoUrl, id: index + 100 });
    });
    return photoUrls;
  });
}

export async function reverseGeocode(lat, lng) {
  const url = `${ReverseGeocodeEndpoint}latlng=${
    lat + "," + lng
  }&key=${GOOGLE_PLACES_API_KEY}`;

  return axios.get(url).then((response) => {
    const address = response.data.plus_code.compound_code.split(" ");
    const formattedAddress = address[1] + address[2];
    return formattedAddress;
  });
}
