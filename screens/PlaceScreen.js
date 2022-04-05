import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Carousel,
  Chip,
  Image,
  ListItem,
  SkeletonView,
  View,
  Text,
} from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { setRecents } from "../slices/appSlice";
import { AntDesign, Entypo } from "@expo/vector-icons";
import tw from "tailwind-rn";
import MapContainer from "../components/MapContainer";
import { analyseReviews } from "../modules/analysSentiment";
import { fetchPlaceImages } from "../modules/PlacesApi";
import { BallIndicator } from "react-native-indicators";
import Loading from "../components/loaders/Loading";
import ListSkeleton from "../components/loaders/ListSkeleton";
import SentimentPie from "../components/SentimentPie";

const PlaceScreen = () => {
  const dispatch = useDispatch();
  const { recents } = useSelector((state) => state.appReducer);
  const [shortReviews, setShortReviews] = useState([]);
  const [placeImages, setPlaceImages] = useState(null);
  const { theme } = useSelector((state) => state.themeReducer);
  const getSentimentColor = (sentiment) => {
    if (sentiment === "N+") return ["bg-red-500"];
    if (sentiment === "N") return ["bg-red-300"];
    if (sentiment === "NEU") return ["bg-orange-300"];
    if (sentiment === "P+") return ["bg-green-500"];
    if (sentiment === "P") return ["bg-green-300"];
    else return false;
  };

  useEffect(() => {
    (async () => {
      const response = await analyseReviews(recents.placeDetails.reviews);
      const imageUris = await fetchPlaceImages(recents.placeDetails);
      setPlaceImages(imageUris);
      setShortReviews(response.sentimentArr);
    })();
  }, [recents]);

  // if (!placeImages) return <Loading />;

  return (
    <View style={[tw("flex-1"), { backgroundColor: theme.background }]}>
      <ImageBackground
        resizeMode="cover"
        style={[tw("h-80"), { width: "100%" }]}
        source={{ uri: recents?.outDoorImg }}
      >
        <View
          style={[
            tw("relative"),
            {
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => dispatch(setRecents(null))}
            style={[
              tw(
                "flex mt-12 ml-4 flex-row items-center justify-center  rounded-full "
              ),
              { height: 40, width: 40, backgroundColor: "white" },
              styles.boxShadow,
            ]}
          >
            <Entypo name="cross" size={30} color="black" />
          </TouchableOpacity>
          <View style={[tw("flex p-4  absolute bottom-0")]}>
            <View
              style={[
                tw("flex flex-row items-start  p-4 rounded-xl"),
                styles.boxShadow,
              ]}
            >
              <Text
                style={[
                  tw("text-3xl text-gray-100 font-semibold"),
                  { maxWidth: "90%" },
                ]}
              >
                {recents?.placeDetails.name}
              </Text>
              <Text style={[tw("text-xl ml-2 text-gray-600 font-semibold")]}>
                {recents?.placeDetails.rating}
              </Text>
              <Entypo name="star" size={24} color="orange" />
            </View>
          </View>
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[tw("text-xl  font-bold m-4"), { color: theme.fontColor }]}
        >
          Sentiment
        </Text>
        <View style={tw("my-4")}>
          <SentimentPie placeData={recents.placeDetails} />
        </View>
        <Text
          style={[tw("text-xl  font-bold m-4"), { color: theme.fontColor }]}
        >
          Gallery
        </Text>
        <View style={tw("flex justify-center mx-4")}>
          <Carousel
            containerStyle={{
              height: 200,
            }}
            loop
            pageControlProps={{
              size: 10,
              containerStyle: styles.loopCarousel,
            }}
            pageControlPosition={Carousel.pageControlPositions.OVER}
          >
            {placeImages?.map((image, i) => (
              <View flex centerV key={i}>
                <Image
                  resizeMode="cover"
                  overlayType={Image.overlayTypes.BOTTOM}
                  style={{ flex: 1 }}
                  source={{
                    uri: image.src,
                  }}
                />
              </View>
            ))}
          </Carousel>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
    borderTopWidth: 0,
  },
  loopCarousel: {
    position: "absolute",
    bottom: 15,
    left: 10,
  },
});
