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
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import RecentScans from "../components/RecentScans";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { setPlaceData } from "../slices/placeDataSlice";
import { useNavigation } from "@react-navigation/native";
import useLocation from "../hooks/useLocation";
import { setUserLocation } from "../slices/appSlice";
import { reverseGeocode } from "../resources/PlacesApi";
import { Modal } from "react-native-ui-lib";
import Loading from "../components/loaders/Loading";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.appReducer);
  const { theme } = useSelector((state) => state.themeReducer);
  const navigation = useNavigation();
  const { user } = useAuth();
  const [locationRetrieved, setLocationRetrieved] = useState(false);
  const [userAddress, setuserAddress] = useState(null);

  const fetchPlaceData = (data, details) => {
    // const { place_id } = data;
    const placeDetails = {
      name: details.name,
      rating: details.rating,
      number: details.formatted_phone_number,
      reviews: details.reviews,
      photos: details.photos,
      location: details.geometry.location,
      priceLevel: details.price_level,
      address: details.formatted_address,
    };
    dispatch(setPlaceData(placeDetails));
    navigation.navigate("Results");
  };

  // get user location
  useEffect(() => {
    (async () => {
      if (userLocation) {
        const userFormattedAddress = await reverseGeocode(
          userLocation.coords.latitude,
          userLocation.coords.longitude
        );
        setuserAddress(userFormattedAddress);
        setLocationRetrieved(true);
      }
    })();
  }, [userLocation]);

  return (
    <View
      style={[
        tw("flex-1 relative"),
        { flex: 1, backgroundColor: theme.background },
      ]}
    >
      <View style={[tw("ml-5 mr-10"), { marginVertical: "15%" }]}>
        <HomeHeader userAddress={userAddress} />
      </View>

      {/* Google places autocomplete  */}
      <View
        style={[
          tw("flex flex-row  mb-10 mx-5 "),
          {
            backgroundColor: theme.foreground,
            borderRadius: 20,
            padding: 10,
          },
        ]}
      >
        <FontAwesome5
          style={tw("self-center")}
          name="search-location"
          size={24}
          color={theme.fontColor}
        />
        <GooglePlacesAutocomplete
          fetchDetails={true}
          onPress={(data, details = null) => fetchPlaceData(data, details)}
          styles={{
            container: {
              flex: 1,
            },
            textInput: {
              borderRadius: 20,
              fontSize: 18,
              backgroundColor: "transparent",
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
          <Text
            style={[
              tw("ml-6 mr-2 text-xl font-bold"),
              { color: theme.fontColor },
            ]}
          >
            Recent Scans
          </Text>
          <MaterialIcons name="history-toggle-off" size={20} color="#505C7D" />
        </View>
        <RecentScans />
      </View>
    </View>
  );
};

export default HomeScreen;
