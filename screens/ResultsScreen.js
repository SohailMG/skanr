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

const defaultImage =
  '"https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_1600,h_350,d_uk:cuisines:chicken-9.jpg/v1/uk/restaurants/40609.jpg"';
const ResultsScreen = () => {
  const { scannedText, placeId, imageUri } = useSelector(
    (state) => state.appReducer
  );
  const navigation = useNavigation();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { placeData, diateryPrefrence } = useSelector(
    (state) => state.placeReducer
  );
  const latitude = 51.57069107350924;
  const longitude = -0.374277452081281;
  const [placeDetails, setPlaceDetails] = useState(null);
  const [sentimentTag, setsentimentTag] = useState(null);
  const [analysedReviews, setAnalysedReviews] = useState([]);
  const [isHalal, setIsHalal] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [fields, setfields] = useState(
    "name%2Cformatted_address%2Cgeometry%2Crating%2Cformatted_phone_number%2Cprice_level%2Cphotos%2Creviews"
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!placeData) {
        const newPlaceDetails = await fetchPlaceDetails(placeId, fields);
        const placeImages = await fetchPlaceImages(newPlaceDetails);
        dispatch(setPlaceImages(placeImages));
        setGallery(placeImages);
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
        const placeImages = await fetchPlaceImages(placeData);
        dispatch(setPlaceImages(placeImages));
        setGallery(placeImages);
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

      setIsHalal(halalStatus);
    };
    (async () => await fetchData())();
  }, []);

  //   perform sentiment analysis on customer reviews

  return (
    <View style={[tw("flex-1 "), { backgroundColor: "#EEEAD8" }]}>
      <View style={[tw("h-1/4"), { borderRadius: 10 }]}>
        {placeDetails && (
          <MapContainer
            location={placeDetails?.location}
            restaurant={placeDetails?.name}
          />
        )}
        <View style={[tw("absolute top-12 left-5"), styles.shadowStyle]}>
          <BackHomeButton />
        </View>
      </View>
      {/* top half */}
      <View style={[tw("flex-1 relative ")]}>
        {/* <ImageBackground source={{ uri: imageUri }} style={{ flex: 1 }}> */}
        <View
          style={[
            tw(""),
            {
              height: "70%",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            },
          ]}
        >
          {/* res name and rating block */}
          <View style={[tw("flex self-center  justify-center ")]}>
            <ImageBackground
              style={{
                width: "100%",

                borderRadius: 30,

                overflow: "hidden",
                marginHorizontal: 10,
              }}
              source={{
                uri: gallery ? gallery[0].src : defaultImage,
              }}
            >
              <View
                style={[
                  tw("self-center p-6 "),
                  { backgroundColor: "rgba(0,0,0,.6)" },
                ]}
              >
                <Text
                  style={[
                    tw("text-white text-3xl font-bold"),
                    styles.shadowStyle,
                  ]}
                >
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
                    tw("mb-2 text-gray-700 font-bold text-3xl"),
                    { fontFamily: "DamascusBold" },
                  ]}
                >
                  {"Halal"}
                </Text>
                {placeDetails?.diatrey.isServed ? (
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
                  "mt-4 mb-4   p-4 self-center mx-4 flex flex-row items-start"
                ),
                styles.shadowStyle,
                {
                  borderRadius: 30,
                  width: "90%",
                  backgroundColor: "white",
                },
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

          <View style={[tw("mt-2 flex flex-row border-t-2 border-gray-100")]}>
            {/* see images button */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Gallery");
              }}
              style={[
                tw("mx-6 mt-2 flex items-center px-2 py-4 rounded-md "),
                ,
              ]}
            >
              <Text style={tw("text-xl font-bold ")}>Food Images</Text>
              <View
                style={tw(
                  "flex bg-gray-800 mt-4 p-2 px-6 rounded-full justify-center flex-row items-center "
                )}
              >
                {gallery &&
                  gallery
                    .slice(0, 4)
                    .map(({ src, id }, index) => (
                      <Image
                        key={id}
                        source={{ uri: src }}
                        style={[tw("h-8 w-8 -ml-4 rounded-md"), {}]}
                      />
                    ))}
                <Text style={tw("text-sm font-semibold text-gray-100")}>
                  +{gallery?.length}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Read reviews buttons */}
            <TouchableOpacity
              style={[
                tw(
                  "mx-2 mt-2 flex items-center justify-center px-2 py-4 rounded-md  "
                ),
              ]}
            >
              <Text style={tw("text-xl font-bold ")}>Customer reviews</Text>
              <View
                style={tw(
                  "flex bg-gray-800 p-2 mt-4 px-6 rounded-full justify-center flex-row items-center "
                )}
              >
                {placeDetails?.reviews
                  .slice(0, 4)
                  .map(({ profile_photo_url }, index) => (
                    <Image
                      key={index}
                      source={{ uri: profile_photo_url }}
                      style={tw("h-8 w-8 -ml-4 rounded-full")}
                    />
                  ))}
                <Text style={tw("text-sm font-semibold text-gray-100")}>
                  +{placeDetails?.reviews.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  },
});
