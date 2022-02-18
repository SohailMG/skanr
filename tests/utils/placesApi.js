import axios from "axios";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve(
        "/Users/sohailgsais/ThirdYear/FinalProject/project-build/skanr-app/.env"
        ),
    });
    
    
const PlacesNearbyEndpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
const radius = 1500;
const placeType = "restaurant";
const testLocation = {
  coords: {
    accuracy: 12.697312666656831,
    altitude: 47.286163330078125,
    altitudeAccuracy: 13.256882667541504,
    heading: -1,
    latitude: 51.57066789714761,
    longitude: -0.37431479445967936,
    speed: -1,
  },
  timestamp: 1645118533411.1462,
};

export async function fetchNearbyPlaces(extractedText) {
  const requestUrl = `${PlacesNearbyEndpoint}location=${testLocation.coords.latitude},${testLocation.coords.longitude}&radius=${radius}&type=${placeType}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  return axios.get(requestUrl).then((response) => {
    const places = response.data.results;
    return places;
  });
}