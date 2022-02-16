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
import LoginForm from "../components/LoginForm";
import { SvgUri } from "react-native-svg";
import LoginSvg from "../assets/loginHero.svg";
import { SvgXml } from "react-native-svg";
// import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  // const {signInWithGoogle} = useAuth();
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={[tw("flex-1 bg-white"), { backgroundColor: "#394464" }]}>
      <LoginSvg />
      <Text style={tw("text-4xl ml-4 text-gray-200 font-semibold")}>
        Welcome
      </Text>
      <Text style={tw("text-lg ml-4 text-gray-400 w-60")}>
        Get place details from just a simple click.
      </Text>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
