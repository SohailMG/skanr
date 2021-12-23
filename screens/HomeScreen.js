import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from 'tailwind-rn'
import SvgAnimation from "../components/SvgAnimation";

const HomeScreen = () => {
  return (
    <View style={tw('flex-1')}>
      {/* Top scanner */}
      <View style={tw('flex-1 absolute top-0 right-0')}>
        <Image
          source={require("../assets/scanner.png")}
          width={100}
          resizeMode={"contain"}
          height={100}
        />
      </View>
      {/* Middle section */}
    </View>
  );
};

export default HomeScreen;
