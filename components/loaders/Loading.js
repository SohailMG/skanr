import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import Spinner from "react-native-loading-spinner-overlay";
import { BallIndicator, WaveIndicator } from "react-native-indicators";
const Loading = ({ text, color }) => {
  return (
    <View
      style={[
        tw("flex-1 items-center justify-center"),
        { backgroundColor: "#000" },
      ]}
    >
      <View style={tw("flex  items-center")}>
        <BallIndicator color="white" size={60} />
        <Text
          style={[
            tw("absolute font-semibold  text-gray-200 self-center"),
            { top: "55%" },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
