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
import { BallIndicator, DotIndicator } from "react-native-indicators";
import { useDispatch } from "react-redux";
import { setPlaceData, setPlaceImages } from "../slices/placeDataSlice";
import { useNavigation } from "@react-navigation/native";
import ReviewBox from "./ReviewBox";
import {
  storePlaceToRecents,
  uploadToRecents,
} from "../controllers/dbHandlers";
import useAuth from "../hooks/useAuth";
import { classifyPlaceOutdoorImage } from "../modules/VisionAi";
import { MotiView } from "moti";
import Stars from "react-native-stars";

const PlaceDetails = ({ placeId }) => {
  // Redux store dispatcher
  const dispatch = useDispatch();
  const { user } = useAuth();
  // react router
  const navigation = useNavigation();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeGallery, setPlaceGallery] = useState(null);
  const [thumbNail, setThumbNail] = useState(null);
  useEffect(() => {
    // fetching place details
    (async () => {
      const placeDetails = await fetchPlaceDetails(placeId);
      const imageUris = await fetchPlaceImages(placeDetails);
      setPlaceDetails(placeDetails);
      setPlaceGallery(imageUris);
      // dispatching place data and images to global store
      dispatch(setPlaceImages(imageUris));
      dispatch(setPlaceData(placeDetails));
      // storing place data to recents
    })();
  }, [placeId]);

  useEffect(() => {
    (async () => {
      try {
        const outDoorImg = await classifyPlaceOutdoorImage(
          placeGallery,
          placeId
        );
        setThumbNail(outDoorImg);
        storePlaceToRecents(user, placeDetails, outDoorImg);
      } catch (err) {
        console.error("Failed -> ", err);
      }
    })();
  }, [placeGallery]);

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
        <>
          <BallIndicator color="gray" size={60} />
          <Text
            style={[tw("absolute mt-1 text-white self-center"), { top: "55%" }]}
          >
            Loading...
          </Text>
        </>
      </Spinner>
    );
  }
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
      }}
      style={tw("m-4 flex")}
    >
      {/* map view of place  */}
      {placeDetails && (
        <MapContainer
          location={placeDetails?.location}
          restaurant={placeDetails?.name}
        />
      )}
      {/* place name */}
      <View
        style={tw(
          "flex self-center mb-4 flex-row items-center mt-4 text-center"
        )}
      >
        {/* restaurant name */}
        <Text
          style={[
            tw("text-white text-center"),
            { fontSize: 25, fontWeight: "800" },
          ]}
        >
          {placeDetails?.name}
        </Text>
        {/* ratings */}
      </View>
      {/* middle list view */}
      <View style={tw("self-center flex flex-row  items-center")}>
        <Stars
          display={placeDetails?.rating}
          half={true}
          spacing={2}
          count={5}
          starSize={20}
          fullStar={<MaterialIcons name="star" size={15} color="orange" />}
          emptyStar={
            <MaterialIcons name="star-outline" size={15} color="orange" />
          }
          halfStar={<MaterialIcons name="star-half" size={15} color="orange" />}
        />
        <Text style={tw("text-white font-bold")}>{placeDetails?.rating}</Text>
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
              key={imageUri.id}
              source={{ uri: imageUri.src }}
              style={[tw("mx-2 rounded-md"), { width: 110, height: 110 }]}
            />
          ))}
          {placeGallery?.length > 3 && (
            <ImageBackground
              source={{ uri: placeGallery[2]?.src }}
              style={[tw("mx-2 rounded-md flex "), { width: 110, height: 110 }]}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Gallery")}
                style={[
                  tw("flex flex-row items-center justify-center"),
                  {
                    width: 110,
                    height: 110,
                    backgroundColor: "rgba(239, 239, 239, 0.60)",
                  },
                ]}
              >
                <AntDesign name="plus" size={25} color="gray" />
                <Text style={tw("text-3xl text-gray-500 font-semibold")}>
                  {placeGallery.length}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        </ScrollView>
      </View>

      {/* Place reviews */}
      <View style={tw("border-t border-gray-600 mx-4 my-2")}></View>
      <View style={tw("m-4 flex flex-row items-center")}>
        <View style={[tw("flex flex-row items-center "), { width: "82%" }]}>
          <Text style={tw("text-gray-200 mr-2 font-bold text-xl")}>
            Reviews
          </Text>
          <MaterialCommunityIcons
            name="comment-quote"
            size={24}
            color="lightblue"
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Reviews")}
          style={tw("bg-gray-700 px-2 rounded-full")}
        >
          <Text style={tw("text-lg text-gray-400")}>see all</Text>
        </TouchableOpacity>
      </View>
      {placeDetails && (
        <TouchableOpacity onPress={() => navigation.navigate("Reviews")}>
          <ReviewBox
            lines={2}
            color={"#494d4f"}
            review={placeDetails.reviews[0]}
          />
        </TouchableOpacity>
      )}
      {/* )} */}
    </MotiView>
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
