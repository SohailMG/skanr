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
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import { setRecents } from "../slices/appSlice";
import PersonSVG from "../assets/personSvg.svg";
import { MotiView } from "moti";
import PlaceContainer from "./PlaceContainer";

const RecentScans = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [recentScans, setRecentScans] = useState([]);
  const { theme } = useSelector((state) => state.themeReducer);
  const { user } = useAuth();
  // console.log(recentScans);
  useEffect(() => {
    (async () => {
      const recents = await fetchRecentsFromDb(user);
      if (!recents) return;
      setRecentScans(sortRecents(recents));
      // dispatch(setRecents(recents));
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

  if (recentScans.length === 0) {
    return (
      <View style={tw("flex-1 p-2 justify-center mb-20 items-center ml-2")}>
        <PersonSVG />
        <Text
          style={[tw("mt-2 text-center text-xl"), { color: theme.fontColor }]}
        >
          No Scans to show
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      style={tw("flex-1 ml-2")}
    >
      {recentScans &&
        recentScans.map(({ placeDetails, outDoorImg, timestamp, placeId }) => (
          <MotiView
            from={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: "timing",
            }}
            key={placeId}
            style={tw("m-4 ")}
          >
            <PlaceContainer
              placeDetails={placeDetails}
              outDoorImg={outDoorImg}
            />
          </MotiView>
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
