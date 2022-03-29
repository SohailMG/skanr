import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import Spinner from "react-native-loading-spinner-overlay";
import { BallIndicator, WaveIndicator } from "react-native-indicators";
import SVGatorComponent from "./SVGatorComponent";
import { useSelector } from "react-redux";
const Loading = ({ text, color }) => {
  const { theme } = useSelector((state) => state.themeReducer);
  return (
    <View
      style={[
        tw("flex-1 items-center justify-center"),
        { backgroundColor: theme.background },
      ]}
    >
      <SVGatorComponent />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
