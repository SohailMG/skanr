import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import React from "react";
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

const PlaceContainer = ({ placeDetails, outDoorImg }) => {
  const { theme } = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const openRecent = (data) => {
    dispatch(setRecents(data));
    navigation.navigate("Place");
  };

  return (
    <TouchableOpacity
      onPress={() => openRecent({ placeDetails, outDoorImg })}
      style={[
        tw(" flex   rounded-2xl p-2"),
        { width: "100%", height: 300, backgroundColor: theme.foreground },
      ]}
    >
      {/* top half */}
      <Image
        source={{ uri: outDoorImg }}
        style={tw("h-1/2 w-full rounded-2xl ")}
      />
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
    </TouchableOpacity>
  );
};

export default PlaceContainer;

const styles = StyleSheet.create({});
