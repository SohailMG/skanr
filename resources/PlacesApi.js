import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import { findBestMatch } from "./bestMatch";

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
const keywords = ["indian"];

/**
 *
 * @param {string} placeId
 */
export async function fetchPlaceDetails(placeId) {
  const url = urlBuilder(placeId);
  return axios
    .get(url)
    .then((response) => {
      const place = response.data.result;
      const newPlaceDetails = {
        name: place.name,
        rating: place.rating,
        number: place.formatted_phone_number,
        reviews: place.reviews,
        photos: place.photos,
        location: place.geometry.location,
        priceLevel: place.price_level,
        address: place.formatted_address,
        diatrey: { type: "Halal", isServed: true },
        website: place.website,
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
export async function fetchNearbyPlaces(userLocation, extractedText, keyword) {
  console.log(keyword);
  const requestUrl = `${PlacesNearbyEndpoint}location=${
    userLocation.coords.latitude
  },${
    userLocation.coords.longitude
  }&radius=${radius}&type=${placeType}&key=${GOOGLE_PLACES_API_KEY}&keyword=${
    keyword ? keyword : ""
  }`;
  return axios.get(requestUrl).then((response) => {
    const places = response.data.results;
    return findBestMatch(places, extractedText);
  });
}

/**
 * fetches images of place using photo refrence object
 * @param {Object} placeDetails google place details object
 * @returns {Array<string>} array of image uris
 */
export async function fetchPlaceImages(placeDetails) {
  const promises = [];
  // looping through array of photo references
  placeDetails.photos.slice(0, 10).forEach(({ photo_reference }) => {
    promises.push(
      axios.get(
        PlacePhotosEndpoint + photo_reference + "&key=" + GOOGLE_PLACES_API_KEY
      )
    );
  });
  return Promise.all(promises)
    .then((responses) => {
      const photoUrls = [];
      // extracting image urls from response
      responses.forEach((response, index) => {
        const photoUrl = response.request.responseURL;
        // storing image uri in array
        photoUrls.push({ src: photoUrl, id: index + 100 });
      });
      return photoUrls;
    })
    .catch((err) => console.error(err));
}

export async function reverseGeocode(lat, lng) {
  const url = `${ReverseGeocodeEndpoint}latlng=${
    lat + "," + lng
  }&key=${GOOGLE_PLACES_API_KEY}`;

  return axios
    .get(url)
    .then((response) => {
      const address = response.data.plus_code.compound_code.split(" ");
      const formattedAddress = address[1] + address[2];
      return formattedAddress;
    })
    .catch((err) => console.error(err));
}
