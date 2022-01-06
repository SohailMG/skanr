import { View, Text } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import PlaceContainer from "./PlaceContainer";
import tw from "tailwind-rn";

const catagories = {
  13377: "vegan",
  13191: "Halal",
  13309: "Middle Eastern",
  13356: "Turkish",
};

const RecommendedPlaces = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setlatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);
    })();
  }, []);
  return (
    <View style={tw("flex-1")}>
      <PlaceContainer longitude={longitude} latitude={latitude} />
    </View>
  );
};

export default RecommendedPlaces;
