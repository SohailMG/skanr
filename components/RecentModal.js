import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RecentModal = () => {
  return (
    <View>
      <Modal
        visible={true}
        onBackgroundPress={() => console.log("background pressed")}
      ></Modal>
    </View>
  );
};

export default RecentModal;

const styles = StyleSheet.create({});
