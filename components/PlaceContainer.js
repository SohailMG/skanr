import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-rn";
import Stars from "react-native-stars";
import { MaterialIcons } from "@expo/vector-icons";
import PlaceButton from "./PlaceButton";
import { useDispatch, useSelector } from "react-redux";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { setRecents } from "../slices/appSlice";
import { useNavigation } from "@react-navigation/native";
import { Carousel } from "react-native-ui-lib";
import { fetchPlaceImages } from "../modules/PlacesApi";

const PlaceContainer = ({ placeDetails, outDoorImg }) => {
  const [placeImages, setPlaceImages] = useState([]);
  const { theme } = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const openRecent = (data) => {
    dispatch(setRecents(data));
    navigation.navigate("Place");
  };

  useEffect(() => {
    (async () => {
      const imageUris = await fetchPlaceImages(placeDetails);
      setPlaceImages(imageUris);
    })();
  }, []);

  return (
    <View
      style={[
        tw(" flex   rounded-2xl p-2"),
        { width: "100%", height: 300, backgroundColor: theme.foreground },
      ]}
    >
      {/* top half */}
      <Carousel
        containerStyle={tw("h-1/2 w-full rounded-2xl ")}
        loop
        pageControlProps={{
          size: 10,
          containerStyle: styles.loopCarousel,
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        <View flex centerV key={outDoorImg}>
          <Image
            resizeMode="cover"
            style={{ flex: 1, borderRadius: 20 }}
            source={{
              uri: outDoorImg,
            }}
          />
        </View>
        {placeImages?.map((image) => (
          <View flex centerV key={image.src}>
            <Image
              resizeMode="cover"
              style={{ flex: 1, borderRadius: 20 }}
              source={{
                uri: image.src,
              }}
            />
          </View>
        ))}
      </Carousel>
      {/* Bottom half */}
      <View style={tw("p-2 mt-2")}>
        <View style={tw("flex  items-center")}>
          <Text
            numberOfLines={1}
            style={[tw("text-xl font-bold"), { color: theme.fontColor }]}
          >
            {placeDetails.name}
          </Text>
          <View style={tw("flex flex-row  items-center")}>
            <Stars
              display={placeDetails.rating}
              half={true}
              spacing={2}
              count={5}
              starSize={20}
              fullStar={<MaterialIcons name="star" size={15} color="orange" />}
              emptyStar={
                <MaterialIcons name="star-outline" size={15} color="orange" />
              }
              halfStar={
                <MaterialIcons name="star-half" size={15} color="orange" />
              }
            />
            <Text>{placeDetails.rating}</Text>
          </View>
          {/* Buttons set */}
          <View style={tw("flex flex-row items-center self-center")}>
            <View
              style={[
                tw(" flex items-center px-2  border-r  mt-4 items-center"),
                { borderColor: theme.background },
              ]}
            >
              <AntDesign name="check" size={20} color="green" />
              <Text
                style={[
                  tw("font-semibold "),
                  { fontSize: 10, color: theme.fontColor },
                ]}
              >
                {placeDetails?.diatrey.type}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${placeDetails?.number}`);
              }}
              style={[
                tw("mx-1 flex  items-center  mt-4 border-r  items-center"),
                { borderColor: theme.background },
              ]}
            >
              <Entypo name="phone" size={20} color="cyan" />
              <Text
                style={[
                  tw("mx-2 font-semibold "),
                  { fontSize: 10, color: theme.fontColor },
                ]}
              >
                {placeDetails?.number || "Unavailable"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`maps://app?daddr=${placeDetails.name}`)
              }
              style={[
                tw("mx-1 flex  items-center  mt-4 border-r  items-center"),
                { borderColor: theme.background },
              ]}
            >
              <Entypo name="location-pin" size={24} color="red" />
              <Text
                style={[
                  tw("mx-2 font-semibold "),
                  { fontSize: 10, color: theme.fontColor },
                ]}
              >
                Directions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(placeDetails?.website);
              }}
              style={tw("mx-1 flex  items-center  mt-4  items-center")}
            >
              <FontAwesome5 name="globe" size={24} color={theme.fontColor} />
              <Text
                style={[
                  tw(" font-semibold "),
                  { fontSize: 10, color: theme.fontColor },
                ]}
              >
                {placeDetails.website ? "Website" : "Unavailable"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlaceContainer;

const styles = StyleSheet.create({
  loopCarousel: {
    position: "absolute",
    bottom: 15,
    left: 10,
  },
});
