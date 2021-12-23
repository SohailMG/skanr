import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "tailwind-rn";

const HomeScreen = () => {
  return (
    <View style={tw("flex-1")}>
      {/* Top scanner */}
      <View style={tw("flex-1 absolute top-0 right-0")}>
        <Image
          source={require("../assets/scanner.png")}
          width={100}
          resizeMode={"contain"}
          height={100}
        />
      </View>
      {/* Middle section */}
      <View style={[tw("ml-10 mr-10"), { marginVertical: "80%" }]}>
        <Text style={tw("text-3xl font-semibold text-gray-800")}>
          Scan restaurant banner or search by name
        </Text>
      </View>
      {/* TODO: Search bar */}
    </View>
  );
};

export default HomeScreen;
