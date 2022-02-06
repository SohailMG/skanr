import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

const PlaceModal = ({ showModal }, ref) => {
  const bottomSheet = useRef();

  // calling child method from parent component
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    openBottomSheet: () => {
      openBottomSheet();
    },
  }));

  // Needed in order to use .show()
  bottomSheet.current.show();
  const openBottomSheet = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        radius={30}
        sheetBackgroundColor={"#333333"}
        hasDraggableIcon
        ref={bottomSheet}
        height={600}
      ></BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default forwardRef(PlaceModal);
