import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import tw from "tailwind-rn";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../components/MapContainer";
import { TouchableOpacity } from "react-native";
import BackHomeButton from "../components/BackHomeButton";
import StatsCircle from "../components/StatsCircle";
import PlaceInfo from "../components/PlaceInfo";
import { setRecentScans } from "../slices/recentsSlice";
import useAuth from "../hooks/useAuth";
import { storePlaceToRecents } from "../controllers/db-controllers";
import { priceLevels, sentimentTags } from "../controllers/sentimentLevels";
import {
  fetchPlaceDetails,
  fetchHalalPlacesNearby,
  fetchPlaceImages,
} from "../controllers/VisionAI-controllers";
import { analyseReviews } from "../controllers/sentiment-controller";
import { setPlaceImages } from "../slices/placeDataSlice";
import { useNavigation } from "@react-navigation/native";
const ResultsScreen = () => {
  const { scannedText, placeId, imageUri } = useSelector(
    (state) => state.appReducer
  );
  const navigation = useNavigation();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { placeData } = useSelector((state) => state.placeReducer);
  const latitude = 51.57069107350924;
  const longitude = -0.374277452081281;
  const [placeDetails, setPlaceDetails] = useState(null);
  const [sentimentTag, setsentimentTag] = useState(null);
  const [analysedReviews, setAnalysedReviews] = useState([]);
  const [isHalal, setIsHalal] = useState(null);
  const [fields, setfields] = useState(
    "name%2Cgeometry%2Crating%2Cformatted_phone_number%2Cprice_level%2Cphotos%2Creviews"
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!placeData) {
        const newPlaceDetails = await fetchPlaceDetails(placeId, fields);
        setPlaceDetails(newPlaceDetails);
        const { sentimentArr, score_tag } = await analyseReviews(
          newPlaceDetails.reviews
        );
        setAnalysedReviews(sentimentArr);
        setsentimentTag(score_tag);
        setPlaceDetails(newPlaceDetails);
        storePlaceToRecents(user, newPlaceDetails);
      } else {
        const { sentimentArr, score_tag } = await analyseReviews(
          placeData.reviews
        );
        setAnalysedReviews(sentimentArr);
        setsentimentTag(score_tag);
        setPlaceDetails(placeData);
        storePlaceToRecents(user, placeData);
      }
      const halalStatus = await fetchHalalPlacesNearby(
        latitude,
        longitude,
        placeDetails
      );
      // console.log(placeDetails, placeData);
      const placeImages = await fetchPlaceImages(
        placeDetails ? placeDetails : placeData
      );
      console.log(placeImages);
      setIsHalal(halalStatus);
      dispatch(setPlaceImages(placeImages));
    };
    (async () => await fetchData())();
  }, []);

  //   perform sentiment analysis on customer reviews

  return (
    <View style={[tw("flex-1 "), { backgroundColor: "#EEEAD8" }]}>
      {/* top half */}
      <View style={[tw("relative h-2/3 "), { backgroundColor: "#B9D8C8" }]}>
        {/* <ImageBackground source={{ uri: imageUri }} style={{ flex: 1 }}> */}
        <SafeAreaView style={[tw("flex  items-center justify-center")]}>
          <View style={tw("absolute top-12 left-5")}>
            <BackHomeButton />
          </View>
          <View
            style={[
              tw("flex flex-row  mt-10"),
              { alignContent: "space-around" },
            ]}
          >
            {sentimentTag && (
              <StatsCircle
                title={"Customer Satisfaction"}
                fillLevel={sentimentTags[sentimentTag][1]}
                hasEmoji={sentimentTags[sentimentTag][0]}
                label={sentimentTags[sentimentTag][2]}
                color={"#F9C53A"}
              />
            )}
            {placeDetails?.priceLevel && (
              <StatsCircle
                title={"Price Level"}
                hasEmoji={"💸"}
                fillLevel={priceLevels[placeDetails?.priceLevel][1]}
                label={priceLevels[placeDetails?.priceLevel][0]}
                color={"#2FB89D"}
              />
            )}
          </View>
          {placeDetails && (
            <PlaceInfo isHalal={isHalal} placeDetails={placeDetails} />
          )}
          {/* rating */}
          {/* review tags */}
        </SafeAreaView>
        {/* </ImageBackground> */}
      </View>
      {/* Bottom half */}
      <View style={[tw("h-40 mx-4 -mt-20"), { borderRadius: 10 }]}>
        {placeDetails && (
          <MapContainer
            location={placeDetails?.location}
            restaurant={placeDetails?.name}
          />
        )}
      </View>
      <View style={tw("mt-4 flex flex-row")}>
        {/* see images button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Gallery")}
          style={[
            tw("mx-6 mt-6 flex items-center w-40 py-4 rounded-md bg-white"),
            ,
          ]}
        >
          <Entypo name="images" size={50} color="green" />
          <Text style={tw("text-sm font-semibold")}>Food Images</Text>
        </TouchableOpacity>
        {/* Read reviews buttons */}
        <TouchableOpacity
          style={[
            tw(
              "mx-6 mt-6 flex items-center justify-center w-40 py-4 rounded-md bg-white"
            ),
            ,
          ]}
        >
          <View style={tw("flex flex-row items-center ")}>
            {placeDetails?.reviews
              .slice(0, 4)
              .map(({ profile_photo_url }, index) => (
                <Image
                  key={index}
                  source={{ uri: profile_photo_url }}
                  style={tw("h-8 w-8 -ml-4 rounded-full")}
                />
              ))}
            <Text style={tw("text-sm font-semibold text-gray-500")}>
              +{placeDetails?.reviews.length}
            </Text>
          </View>
          <Text style={tw("text-sm font-semibold ")}>customer reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
