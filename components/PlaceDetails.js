import { StyleSheet, Text, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-rn";
import { fetchPlaceDetails } from "../modules/PlacesApi";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import MapContainer from "./MapContainer";
import { TouchableOpacity } from "react-native";

const PlaceDetails = ({ placeId }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  useEffect(() => {
    // fetching place details
    (async () => {
      const response = await fetchPlaceDetails(placeId);
      setPlaceDetails(response);
    })();
  }, [placeId]);

  return (
    <View style={tw("m-4")}>
      {/* {placeDetails && ( */}
      <View style={tw("flex mb-4 flex-row items-center")}>
        <View style={[tw("flex mr-2 flex-row items-center  p-1 rounded-xl")]}>
          <Text style={[tw("text-white text-xl font-semibold")]}>
            {placeDetails?.rating}
          </Text>
          <AntDesign name="star" size={20} color="yellow" />
        </View>
        {/* restaurant name */}
        <Text style={[tw("text-white"), { fontSize: 25, fontWeight: "800" }]}>
          {placeDetails?.name}
        </Text>
        {/* ratings */}
      </View>
      {/* map view of place  */}
      {placeDetails && (
        <MapContainer
          location={placeDetails?.location}
          restaurant={placeDetails?.name}
        />
      )}
      {/* middle list view */}
      <View style={tw("flex flex-row items-center")}>
        <View
          style={tw(
            "mx-2 flex items-center  px-2 flex-row border-r border-gray-500 mt-4 items-center"
          )}
        >
          <Text
            style={[tw("text-gray-400 mr-2 font-semibold "), { fontSize: 15 }]}
          >
            {placeDetails?.diatrey.type}
          </Text>
          <AntDesign name="check" size={20} color="green" />
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(placeDetails.website);
          }}
          style={tw(
            "mx-2 flex flex-row items-center  mt-4 px-2 border-r border-gray-500 items-center"
          )}
        >
          <Text
            style={[tw("text-gray-400 mr-2 font-semibold "), { fontSize: 15 }]}
          >
            Website
          </Text>
          <FontAwesome5 name="globe" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${placeDetails.number}`);
          }}
          style={tw("mx-2 flex flex-row items-center  mt-4 px-2  items-center")}
        >
          <Text
            style={[tw("text-gray-400 mr-2 font-semibold "), { fontSize: 15 }]}
          >
            {placeDetails?.number || "Unavailable"}
          </Text>
          <Entypo name="phone" size={20} color="cyan" />
        </TouchableOpacity>
      </View>
      {/* address blovk */}
      <View style={tw("flex m-2 mt-4 flex-row items-center")}>
        <FontAwesome name="map-marker" size={24} color="orange" />
        <Text style={[tw("ml-2 text-gray-200")]}>{placeDetails?.address}</Text>
      </View>

      {/* )} */}
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  sectionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    marginVertical: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
