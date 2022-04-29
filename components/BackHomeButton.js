import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setScanActive } from "../slices/appSlice";
import { setPlaceData } from "../slices/placeDataSlice";

const BackHomeButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Home");
        dispatch(setScanActive(false));
        dispatch(setPlaceData(null));
      }}
      style={[
        tw("bg-white w-20 rounded-full mb-10 flex items-center justify-center"),
        {},
      ]}
    >
      <Ionicons name="ios-return-down-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackHomeButton;
