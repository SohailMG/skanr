import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import HomeHeader from "../components/HomeHeader";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import RecentScans from "../components/RecentScans";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { setPlaceData } from "../slices/placeDataSlice";
import { useNavigation } from "@react-navigation/native";
import useLocation from "../hooks/useLocation";
import { setUserLocation } from "../slices/appSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.appReducer);
  const location = useLocation();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [locationRetrieved, setLocationRetrieved] = useState(false);
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
      formatted_address,
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
      address: formatted_address,
    };

    dispatch(setPlaceData(placeDetails));
    navigation.navigate("Results");
  };

  // get user location
  useEffect(() => {
    console.log(locationRetrieved);
    (() => {
      const [currentLocation] = location;

      if (currentLocation) {
        dispatch(setUserLocation(currentLocation));
        setLocationRetrieved(true);
      }
    })();
  }, [location]);

  return (
    <View style={[tw("flex-1 relative"), { backgroundColor: "#EEEAD8" }]}>
      <ImageBackground
        style={[tw("w-full h-full"), { flex: 1 }]}
        source={require("../assets/landingScreen.png")}
      >
        {/* Top scanner */}
        <View style={[tw("ml-5 mr-10"), { marginVertical: "15%" }]}>
          <HomeHeader />
          {!userLocation && (
            <View style={[tw("flex flex-row items-center")]}>
              <FontAwesome name="location-arrow" size={24} color="black" />
              <Text style={tw("font-semibold text-red-500")}>
                Updating location{" "}
              </Text>
              <ActivityIndicator size="small" color="green" />
            </View>
          )}
        </View>

        {/* Google places autocomplete  */}
        <View style={[tw("flex flex-row  mb-10 mx-5 mt-4"), {}]}>
          <FontAwesome5
            style={tw("self-start")}
            name="search-location"
            size={24}
            color="gray"
          />
          <GooglePlacesAutocomplete
            fetchDetails={true}
            onPress={(data, details = null) => fetchPlaceData(data, details)}
            styles={{
              container: {
                flex: 1,
              },
              textInput: {
                fontSize: 18,
                backgroundColor: "transparent",
                borderBottomWidth: 1,
                borderBottomColor: "white",
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
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
