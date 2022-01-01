import axios from "axios";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { useEffect } from "react";
import tw from "tailwind-rn";

const PlaceContainer = ({ longitude, latitude }) => {
  const [placeIds, setPlaceIds] = useState(null);
  const [keyword, setkeyword] = useState("chicken");
  const [placeImage, setplaceImage] = useState(null);
  const [nearByPlaces, setNearByPlaces] = useState([]);
  const [fields, setfields] = useState(
    "name%2Crating%2Cformatted_phone_number%2Cphotos%2Creviews"
  );
  const lat = "51.57069107350924";
  const long = "-0.374277452081281";
  const fetchPlaceIds = async () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&type=restaurant&keyword=${keyword}&key=${GOOGLE_PLACES_API_KEY}`
      )
      .then((response) => {
        const { results } = response.data;
        setPlaceIds(results);
      });
  };
  const fetchPlaceData = async () => {
    placeIds.forEach((place) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}`
        )
        .then((response) => {
          const { result } = response.data;
          setNearByPlaces((oldArray) => [...oldArray, result]);
        });
    });
  };

  const fetchPlaceImages = async () => {
      const photRef = nearByPlaces[0].photos[0].photo_reference;
      
    axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photRef}&key=${GOOGLE_PLACES_API_KEY}`
    ).then(response => {
        setplaceImage(response.data)
        // console.log(response.data)

    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlaceIds();
      await fetchPlaceData();
      fetchPlaceImages();
    };
    fetchData();
  }, []);

  return (
    <View style={tw('flex-1')}>
        {placeImage && <Text>{placeImage}</Text>}
      {/* {placeImage && <Image source={{ uri: placeImage }} width={50} height={50} />} */}
    </View>
  );
};

export default PlaceContainer;
