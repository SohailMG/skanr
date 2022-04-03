import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import HeroSvg from "../assets/heroSvg.svg";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeroScreen = () => {
  const { theme } = useSelector((state) => state.themeReducer);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw("flex items-center justify-center")}>
      {/* Hero icon svg */}
      <View style={tw("mt-6")}>
        <HeroSvg />
      </View>
      <Text
        style={[tw("text-xl font-semibold  mt-10"), { color: theme.fontColor }]}
      >
        Get started with
      </Text>
      <Text style={[tw("text-2xl font-bold"), { color: "#312070" }]}>
        SKANR
      </Text>
      <Text
        style={[
          tw("text-lg mt-10 font-light text-center px-10"),
          { color: theme.fontColor },
        ]}
      >
        Get details on any place simply by pointing the camera and taking a
        picture and SKANR will show you the place details in seconds
      </Text>

      {/* react native button with icon */}
      <TouchableOpacity
        style={[
          tw("mt-10 w-20 h-20 rounded-full justify-center items-center"),
          { backgroundColor: theme.foreground },
        ]}
      >
        <AntDesign
          name="arrowright"
          size={30}
          color={theme.fontColor}
          onPress={() => navigation.navigate("Login")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeroScreen;

const styles = StyleSheet.create({});
