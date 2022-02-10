import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-rn";
import { fetchPlaceDetails, fetchPlaceImages } from "../modules/PlacesApi";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MapContainer from "./MapContainer";
import { TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { DotIndicator } from "react-native-indicators";
import Stars from "react-native-stars";

const PlaceDetails = ({ placeId }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeGallery, setPlaceGallery] = useState(null);
  useEffect(() => {
    // fetching place details
    (async () => {
      const response = await fetchPlaceDetails(placeId);
      const imageUris = await fetchPlaceImages(response);
      setPlaceDetails(response);
      setPlaceGallery(imageUris);
    })();
  }, [placeId]);

  // showing loading indicator when data is unavailable
  if (!placeGallery) {
    return (
      <Spinner
        animation="fade"
        color="green"
        visible={!placeGallery}
        textStyle={{ color: "white" }}
        style={tw("flex flex-row items-center justify-center")}
      >
        <DotIndicator color="cyan" size={15} />
        <Text style={[tw("absolute  text-white self-center"), { top: "55%" }]}>
          Loading...
        </Text>
      </Spinner>
    );
  }
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
      {/* Place images */}
      <View style={tw("border-t border-gray-600 mx-4 my-2")}></View>
      <View style={tw("m-4 flex flex-row items-center")}>
        <Text style={tw("text-gray-200 mr-2 font-bold text-xl")}>Gallery</Text>
        <Ionicons name="image" size={24} color="orange" />
      </View>
      <View style={tw("flex m-2 mt-4 flex-row items-center")}>
        <ScrollView horizontal>
          {placeGallery?.slice(0, 2).map((imageUri) => (
            <Image
              source={{ uri: imageUri.src }}
              style={[tw("mx-2 rounded-md"), { width: 110, height: 110 }]}
            />
          ))}
          <ImageBackground
            source={{ uri: placeGallery[2]?.src }}
            style={[tw("mx-2 rounded-md flex "), { width: 110, height: 110 }]}
          >
            <View
              style={[
                tw("flex flex-row items-center justify-center"),
                {
                  width: 110,
                  height: 110,
                  backgroundColor: "#EFEFEFrgba(239, 239, 239, 0.60)",
                },
              ]}
            >
              <AntDesign name="plus" size={25} color="white" />
              <Text style={tw("text-3xl text-white font-semibold")}>
                {placeGallery.length}
              </Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>

      {/* Place reviews */}
      <View style={tw("border-t border-gray-600 mx-4 my-2")}></View>
      <View style={tw("m-4 flex flex-row items-center")}>
        <Text style={tw("text-gray-200 mr-2 font-bold text-xl")}>Reviews</Text>
        <MaterialCommunityIcons
          name="comment-quote"
          size={24}
          color="lightblue"
        />
      </View>
      <View style={[tw("mx-4  rounded-xl"), { backgroundColor: "#494d4f" }]}>
        {placeDetails && (
          <View>
            <View style={tw("flex flex-row items-center")}>
              <Image
                style={[tw("m-2"), { width: 40, height: 40 }]}
                source={{ uri: placeDetails.reviews[0].profile_photo_url }}
              />
              <View style={tw("flex items-start mt-2")}>
                <Text style={tw("text-gray-100 font-semibold text-md")}>
                  {placeDetails.reviews[0].author_name}
                </Text>
                <Text style={tw("text-gray-500 ")}>
                  {placeDetails.reviews[0].relative_time_description}
                </Text>
                <View style={[tw("mt-2 ")]}>
                  <Stars
                    display={placeDetails?.reviews[0].rating}
                    half={true}
                    spacing={8}
                    count={5}
                    starSize={20}
                    fullStar={
                      <MaterialIcons name="star" size={15} color="yellow" />
                    }
                    emptyStar={
                      <MaterialIcons
                        name="star-outline"
                        size={15}
                        color="yellow"
                      />
                    }
                    halfStar={
                      <MaterialIcons
                        name="star-half"
                        size={15}
                        color="yellow"
                      />
                    }
                  />
                </View>
              </View>
            </View>
            <Text style={tw("p-2 text-white")}>
              {placeDetails.reviews[0].text}
            </Text>
          </View>
        )}
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
