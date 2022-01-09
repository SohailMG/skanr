import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text } from "react-native";
import SvgAnimation from "../components/SvgAnimation";

const SplashScreen = () => {
  const navigator = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigator.navigate("Login");
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#EEEAD8" }}>
      <SvgAnimation />
    </View>
  );
};

export default SplashScreen;
