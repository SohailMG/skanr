import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
    <View style={tw("flex-1 bg-white")}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/landingScreen.png")}
      >
        {/* Top image */}
        {/* Welcome text */}
        <View style={tw("flex-1 mt-12 items-start ml-10")}>
          <View style={tw("flex flex-row items-center")}>
            <Image
              source={require("../assets/appLogo.png")}
              resizeMode="contain"
              style={{ width: 200, height: 100 }}
            ></Image>
          </View>
          <Text style={tw("font-light text-xl text-gray-400 mt-2")}>
            Waste no time. Just take a picture of the front of a restaurant and
            Skanr will give you all details you need
          </Text>
        </View>
        {/* Sign in button */}
        <View
          style={[
            tw("flex-1 absolute p-2 bottom-40 w-52 bg-white  rounded-full "),
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
        {/* create account button */}
        <View
          style={[
            tw("flex-1 absolute p-2 w-52 bg-white  rounded-full "),
            {
              marginHorizontal: "25%",
              shadowColor: "#171717",
              bottom: 100,
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            },
          ]}
        >
          <TouchableOpacity style={tw("flex flex-row items-center")}>
            <Ionicons name="ios-create" size={24} color="green" />
            <Text style={tw("ml-2 text-center font-semibold")}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
