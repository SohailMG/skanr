import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../slices/locationSlice";
const ScanButton = ({ children, onPress }) => {
 const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={()=> dispatch(setMessage(true))}
      style={[
        tw("    "),
        {
          justifyContent: "center",
          alignItems: "center",
          top: -30,
          shadowColor: "white",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
      ]}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#F9FE02",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/scanIcon.png")}
          resizeMode="cover"
          width={70}
          height={70}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ScanButton;
