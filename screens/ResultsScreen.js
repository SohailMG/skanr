import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Modal,
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
    "name%2Cformatted_address%2Cgeometry%2Crating%2Cformatted_phone_number%2Cprice_level%2Cphotos%2Creviews"
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
        await storePlaceToRecents(user, newPlaceDetails);
      } else {
        const { sentimentArr, score_tag } = await analyseReviews(
          placeData.reviews
        );
        setAnalysedReviews(sentimentArr);
        setsentimentTag(score_tag);
        setPlaceDetails(placeData);
        await storePlaceToRecents(user, placeData);
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
      setIsHalal(halalStatus);
      dispatch(setPlaceImages(placeImages));
    };
    (async () => await fetchData())();
  }, []);

  //   perform sentiment analysis on customer reviews

  return (
    <View style={[tw("flex-1 "), { backgroundColor: "#EEEAD8" }]}>
      <View style={[tw("h-1/3"), { borderRadius: 10 }]}>
        {placeDetails && (
          <MapContainer
            location={placeDetails?.location}
            restaurant={placeDetails?.name}
          />
        )}
        <View style={tw("absolute top-12 left-5")}>
          <BackHomeButton />
        </View>
      </View>
      {/* top half */}
      <View style={[tw("relative "), styles.modalStyle]}>
        {/* <ImageBackground source={{ uri: imageUri }} style={{ flex: 1 }}> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            // this.closeButtonFunction()
          }}
        >
          <View
            style={[
              tw("bg-gray-800"),
              {
                height: "70%",
                marginTop: "auto",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              },
            ]}
          >
            {/* res name and rating block */}
            <View style={[tw("flex self-center -mt-10 justify-center ")]}>
              <ImageBackground
                style={{ width: "100%", borderRadius: 30, overflow: "hidden" }}
                source={{
                  uri: "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_1600,h_350,d_uk:cuisines:chicken-9.jpg/v1/uk/restaurants/40609.jpg",
                }}
              >
                <View
                  style={[
                    tw("self-center p-6 "),
                    { backgroundColor: "rgba(0,0,0,.6)" },
                  ]}
                >
                  <Text style={tw("text-white text-3xl font-bold")}>
                    {placeDetails?.name}
                  </Text>
                  <Text style={tw("mt-2 text-white text-gray-400")}>
                    <Entypo name="location" size={24} color="red" />
                    {placeDetails?.address}
                  </Text>
                </View>
              </ImageBackground>
              <View style={tw("flex flex-row items-center justify-center")}>
                <View
                  style={[
                    tw(" p-4 mx-4 flex items-center mt-4"),
                    styles.shadowStyle,
                    { borderRadius: 30 },
                  ]}
                >
                  <Text
                    style={[
                      tw("mb-2 text-white font-bold text-3xl"),
                      { fontFamily: "DamascusBold" },
                    ]}
                  >
                    Vegans
                  </Text>
                  {true ? (
                    <AntDesign name="checkcircle" size={50} color="green" />
                  ) : (
                    <Entypo name="circle-with-cross" size={50} color="red" />
                  )}
                </View>
              </View>
              {/* circle stats box */}
              <View
                style={[
                  tw(
                    "mt-4 mb-4 bg-gray-800   p-4 self-center mx-4 flex flex-row items-start"
                  ),
                  styles.shadowStyle,
                  { borderRadius: 30, width: "90%" },
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
            </View>

            <View style={[tw("mt-4 flex flex-row")]}>
              {/* see images button */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Gallery")}
                style={[
                  tw(
                    "mx-6 mt-6 flex items-center w-40 py-4 rounded-md bg-white"
                  ),
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
                <Text style={tw("text-sm font-semibold ")}>
                  customer reviews
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* </ImageBackground> */}
      </View>
      {/* Bottom half */}
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
  modalStyle: {
    backgroundColor: "#EEEAD8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,

    elevation: 10,
  },
});
