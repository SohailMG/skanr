import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import HomeHeader from "../components/HomeHeader";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import RecentScans from "../components/RecentScans";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { setPlaceData } from "../slices/placeDataSlice";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useAuth();
  //  console.log(imageUri)
  const fetchPlaceData = (data, details) => {
    // const { place_id } = data;
    const {
      formatted_phone_number,
      geometry,
      name,
      photos,
      rating,
      reviews,
      place_id,
      price_level,
    } = details;
    const placeDetails = {
      name: name,
      rating: rating,
      number: formatted_phone_number,
      reviews: reviews,
      photos: photos,
      location: geometry.location,
      priceLevel: price_level,
    };

    dispatch(setPlaceData(placeDetails));
    navigation.navigate("Results");
  };

  return (
    <View style={[tw("flex-1 relative"), { backgroundColor: "#EEEAD8" }]}>
      {/* Top scanner */}
      <View style={[tw("ml-5 mr-10"), { marginVertical: "15%" }]}>
        <HomeHeader />
      </View>

      {/* Google places autocomplete  */}
      <View style={[tw("flex mb-10 mx-5 mt-4"), {}]}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          onPress={(data, details = null) => fetchPlaceData(data, details)}
          styles={{
            container: {
              flex: 0,
              backgroundColor: "#FEFFFE",
              borderRadius: "50px",
            },
            textInput: {
              borderRadius: "50px",
              fontSize: 18,
              // backgroundColor: "#",
            },
          }}
          placeholder="Search restaurant"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={300}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
        />
      </View>
      {/* Recomended*/}
      <View style={tw("flex-1 mt-2 mx-4")}>
        <View style={tw("flex flex-row items-center")}>
          <Text style={tw("ml-6 mr-2 text-xl text-gray-800 font-semibold")}>
            Recent Scans
          </Text>
          <MaterialIcons name="history-toggle-off" size={20} color="green" />
        </View>
        <RecentScans />
      </View>
    </View>
  );
};

export default HomeScreen;
