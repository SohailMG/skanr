import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import HomeHeader from "../components/HomeHeader";
import { AntDesign } from "@expo/vector-icons";
import RecommendedPlaces from "../components/RecommendedPlaces";
import ClassifyImg from "../components/ClassifyImg";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { user } = useAuth();
   const { imageUri } = useSelector((state) => state.appReducer);
   console.log(imageUri)
  return (
    <View style={tw("flex-1 ")}>
      {/* Top scanner */}
      <View style={[tw("ml-5 mr-10"), { marginVertical: "15%" }]}>
        <HomeHeader />
      </View>
      <View style={[tw("mx-5 mb-4 h-32 p-2"),{width:155}]}>
        <Text
          style={[
            tw("font-bold text-gray-800"),
            {fontSize:40 },
          ]}
        >
          Search or Scan
        </Text>
      </View>
      {/* Google places autocomplete  */}
      <View style={[tw("flex-1 mx-5"), { marginVertical: "-8%" }]}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
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
      <View style={tw('flex-1')}>
        {/* <RecommendedPlaces/> */}
        {imageUri && <Image source={{ uri: imageUri }} style={{width:200,height:400}}/>}
        <ClassifyImg/>
      </View>
    </View>
  );
};

export default HomeScreen;
