import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-rn";
import { fetchRecentsFromDb } from "../db-controllers";
import useAuth from "../hooks/useAuth";
import MapContainer from "./MapContainer";
import MapView, { Marker } from "react-native-maps";
const catagories = {
  13377: "vegan",
  13191: "Halal",
  13309: "Middle Eastern",
  13356: "Turkish",
};

const RecentScans = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  // const { recentScans } = useSelector((state) => state.recentsReducer);
  const { user } = useAuth();

  // console.log(recentScans);
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
      const recents = await fetchRecentsFromDb(user);
      setRecentScans(recents);
    })();
  }, []);

  return (
    <ScrollView style={tw("flex-1 ml-2")}>
      {recentScans.map(({ placeDetails, timestamp }, index) => (
        <View
          key={index}
          style={[tw(" m-2 w-90  rounded-3xl p-4 "), styles.shadowStyle]}
        >
          <View style={tw("flex-1 mb-4")}>
            <MapContainer
              location={JSON.parse(placeDetails)["location"]}
              restaurant={JSON.parse(placeDetails)["name"]}
            />
          </View>
          <Text style={tw("text-xs font-semibold")}>
            {JSON.parse(placeDetails)["name"]}
          </Text>
          <Text style={tw("text-xs text-gray-400 font-semibold")}>
            {new Date(timestamp?.toDate()).toDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RecentScans;
const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "white",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
