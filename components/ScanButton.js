import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../slices/appSlice";
import { Ionicons } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
const ScanButton = ({ children, onPress }) => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.appReducer);
  return (
    <TouchableOpacity
      disabled={!userLocation}
      onPress={() => dispatch(setMessage(true))}
      style={[
        tw("    "),
        {
          justifyContent: "center",
          alignItems: "center",
          top: -30,
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
      ]}
    >
      <View
        style={[
          tw("flex items-center justify-center"),
          {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "white",
          },
        ]}
      >
        <Ionicons
          style={tw("ml-1 ")}
          name="ios-scan-outline"
          size={50}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ScanButton;
