import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-rn";
import { fetchRecentsFromDb } from "../controllers/dbHandlers";
import { Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { useSelector } from "react-redux";

const RecentScans = () => {
  const [recentScans, setRecentScans] = useState([]);
  const { theme } = useSelector((state) => state.themeReducer);
  const { user } = useAuth();
  // console.log(recentScans);
  useEffect(() => {
    (async () => {
      const recents = await fetchRecentsFromDb(user);
      setRecentScans(sortRecents(recents));
    })();
  }, []);

  const formatDate = (timestamp) => {
    return moment(new Date(timestamp.seconds * 1000)).fromNow();
  };

  const sortRecents = (recents) => {
    return recents.sort((a, b) => {
      return b.timestamp.seconds - a.timestamp.seconds;
    });
    // console.log(sorted);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal
      style={tw("flex-1 ml-2")}
    >
      {recentScans &&
        recentScans.map(({ placeDetails, outDoorImg, timestamp, placeId }) => (
          <View key={placeId} style={tw("m-4 ")}>
            <ImageBackground
              borderRadius={30}
              source={{ uri: outDoorImg }}
              style={[{ width: 250, height: 300 }]}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 30,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              ></View>
              <View
                style={[
                  tw(
                    "p-2 flex flex-row items-center absolute top-4 right-2  rounded-md"
                  ),
                  { backgroundColor: "white", height: 40 },
                  styles.shadowStyle,
                ]}
              >
                <Text style={tw("text-gray-600 text-lg font-bold")}>
                  {placeDetails.rating}
                </Text>
                <Entypo name="star" size={24} color="orange" />
              </View>
              <View
                style={[
                  tw("mx-2 p-4 absolute bottom-0 -mb-10 rounded-3xl"),
                  {
                    backgroundColor: "white",
                    height: 200,
                    width: "93%",
                  },
                  styles.shadowStyle,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={tw("text-gray-600 text-lg font-bold")}
                >
                  {placeDetails.name}
                </Text>
                <Text style={tw("text-gray-500 text-xs font-bold")}>
                  {formatDate(timestamp)}
                </Text>
                <View style={tw("flex flex-row items-center self-center")}>
                  <View
                    style={tw(
                      " flex items-center px-2  border-r border-gray-500 mt-4 items-center"
                    )}
                  >
                    <AntDesign name="check" size={20} color="green" />
                    <Text
                      style={[
                        tw("text-gray-400  font-semibold "),
                        { fontSize: 10 },
                      ]}
                    >
                      {placeDetails?.diatrey.type}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`tel:${placeDetails?.number}`);
                    }}
                    style={tw(
                      "mx-1 flex  items-center  mt-4 border-r border-gray-500 items-center"
                    )}
                  >
                    <Entypo name="phone" size={20} color="cyan" />
                    <Text
                      style={[
                        tw("text-gray-400 mx-2 font-semibold "),
                        { fontSize: 10 },
                      ]}
                    >
                      {placeDetails?.number || "Unavailable"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(placeDetails?.website);
                    }}
                    style={tw("mx-1 flex  items-center  mt-4  items-center")}
                  >
                    <FontAwesome5 name="globe" size={20} color="gray" />
                    <Text
                      style={[
                        tw("text-gray-400  font-semibold "),
                        { fontSize: 10 },
                      ]}
                    >
                      Website
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    tw("mt-4 self-start  flex items-center   rounded-md  "),
                  ]}
                >
                  <View
                    style={tw(
                      "flex bg-gray-800 p-2  pl-5 rounded-full flex-row items-center "
                    )}
                  >
                    {placeDetails?.reviews
                      .slice(0, 3)
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
            </ImageBackground>
          </View>
        ))}
    </ScrollView>
  );
};

export default RecentScans;
const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
});
