import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import * as IND from "react-native-indicators";

const ListSkeleton = ({ times }) => {
  const numOfItmes = new Array(times).fill(times);
  return (
    <SafeAreaView>
      <Image
        
        resizeMode={"contain"}
        source={require("../../assets/skeleton-loader.gif")}
      />
    </SafeAreaView>
  );
};

export default ListSkeleton;

const styles = StyleSheet.create({});
