import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-rn";
import { fetchRecentsFromDb } from "../controllers/db-controllers";
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
  const [recentScans, setRecentScans] = useState([]);
  // const { recentScans } = useSelector((state) => state.recentsReducer);
  const { user } = useAuth();
  // console.log(recentScans);
  useEffect(() => {
    (async () => {
      const recents = await fetchRecentsFromDb(user);
      setRecentScans(recents);
    })();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw("flex-1 ml-2")}>
      {recentScans &&
        recentScans.map(({ placeDetails, timestamp }, index) => (
          <View
            key={index}
            style={[tw("bg-gray-100 m-2 rounded-3xl p-4 "), styles.shadowStyle]}
          >
            <View style={tw("flex-1 mb-4")}>
              <MapContainer
                location={placeDetails["location"]}
                restaurant={placeDetails["name"]}
              />
            </View>
            <Text style={tw("text-lg text-gray-800 font-semibold")}>
              {placeDetails["name"]}
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
