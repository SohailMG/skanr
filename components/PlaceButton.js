import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";

const PlaceButton = ({ label, Icon, name, color }) => {
  return (
    <TouchableOpacity
      disabled={label === "halal" || label === "vegan"}
      style={[
        tw("flex items-center justify-center p-4 w-20 rounded-xl mx-2"),
        { backgroundColor: color },
      ]}
    >
      <>
        <Icon name={name} size={24} color={"#73FBFD"} />
        <Text
          style={[
            tw("text-gray-400 font-bold pt-2 font-semibold "),
            { fontSize: 10 },
          ]}
        >
          {label || "Unavailable"}
        </Text>
      </>
    </TouchableOpacity>
  );
};

export default PlaceButton;

const styles = StyleSheet.create({});
