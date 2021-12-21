import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
// import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  // const {signInWithGoogle} = useAuth();
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      {/* Top image */}
      <View style={tw("flex-1")}>
        <Image
          source={require("../assets/appLoginBg.png")}
          resizeMode="contain"
          style={[tw("absolute top-0 "), { width: "100%", height: 500 }]}
        ></Image>
      </View>
      {/* Welcome text */}
      <View style={tw("flex-1 items-start ml-10")}>
        <View style={tw("flex flex-row items-center")}>
          <Text style={tw("font-bold text-4xl text-green-800 mr-2")}>
            Scannitor
          </Text>
          <AntDesign name="scan1" size={50} color="black" />
        </View>
        <Text style={tw("font-light text-xl text-gray-400 mt-2")}>
          Using AI to give you the details you need about a restaurant before
          you go in
        </Text>
      </View>
      {/* Sign in button */}
      <View
        style={[
          tw(
            "flex-1 absolute p-2 bottom-40 w-52 bg-white shadow-4xl rounded-full "
          ),
          {
            marginHorizontal: "25%",
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
        ]}
      >
        <TouchableOpacity
          style={[tw("flex flex-row items-center ")]}
          onPress={signInWithGoogle}
        >
          <AntDesign name="google" size={24} color="black" />
          <Text style={tw("ml-2 text-center font-semibold")}>
            Continue with google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
