import React, {
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import tw from "tailwind-rn";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import PlaceInfo from "./PlaceInfo";
import PlaceDetails from "./PlaceDetails";

const PlaceModal = ({ placeId }, ref) => {
  console.log("MODAL ", placeId);
  // const { placeId } = useSelector((state) => state.appReducer);
  const [closedModal, setClosedModal] = useState(true);
  const [index, setIndex] = useState(-1);
  console.log(placeId);
  // ref
  const bottomSheetRef = useRef();

  useImperativeHandle(ref, () => ({
    handleOpenPress: () => {
      handleOpenPress();
    },
  }));

  // variables
  const snapPoints = useMemo(() => ["25%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) setClosedModal(true);
  }, []);

  // handle modal close
  const handleClosePress = () => bottomSheetRef.current.close();
  // handle modal open
  const handleOpenPress = () => {
    setClosedModal(false);
    setIndex(1);
  };
  // renders

  if (closedModal) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#353839", borderRadius: 30 }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <View style={tw("flex h-full")}>
          <TouchableOpacity
            onPress={handleClosePress}
            style={tw("bg-gray-600 rounded-full p-1 self-end right-4")}
          >
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {placeId && <PlaceDetails placeId={placeId} />}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default forwardRef(PlaceModal);
