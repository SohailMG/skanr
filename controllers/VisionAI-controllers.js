import {
  GOOGLE_PLACES_API_KEY,
  SENTIMENT_API_KEY,
  FOURSQUARE_API_KEY,
} from "@env";
import axios from "axios";

export const fetchPlaceDetails = async (placeId, fields) => {
  // console.log(placeIds);
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}`;

  console.log(url);
  return axios.get(url).then((response) => {
    // console.log(response.data);
    const {
      formatted_phone_number,
      photos,
      reviews,
      name,
      rating,
      geometry,
      price_level,
      formatted_address,
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
    };
    return newPlaceDetails;
  });
};

// gets place images
export const fetchPlaceImages = async (placeDetails) => {
  const promises = [];
  placeDetails.photos.slice(0, 10).forEach(({ photo_reference }) => {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
    promises.push(axios.get(url));
  });

  return Promise.all(promises).then((responses) => {
    const photoUrls = [];
    responses.forEach((response, index) => {
      const photoUrl = response.request.responseURL;
      photoUrls.push({ src: photoUrl, id: index + 100 });
    });
    return photoUrls;
    // console.log(response.length);
  });
};

// fetch places based on diatrey prefrence
export const fetchHalalPlacesNearby = async (
  latitude,
  longitude,
  placeDetails
) => {
  const config = {
    method: "get",
    url: `https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&categories=13191&sort=DISTANCE`,
    headers: {
      Accept: "application/json",
      Authorization: FOURSQUARE_API_KEY,
    },
  };
  return axios(config)
    .then(function (response) {
      const places = response.data.results;
      // console.log(places);
      for (let place of places) {
        const { name, categories } = place;
        if (categories[0].id == "13191") {
          if (name.toLowerCase() == placeDetails?.name.toLowerCase()) {
            console.log("is Halal");
            return true;
          }
        }
      }
      return false;
    })
    .catch(function (error) {
      console.log(error);
    });
};
