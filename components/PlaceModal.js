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

const PlaceModal = ({ placeId }, ref) => {
  const [closedModal, setClosedModal] = useState(true);
  const [index, setIndex] = useState(-1);
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
    console.log(index);
    if (index === -1) setClosedModal(true);
  }, []);

  // handle modal close
  const handleClosePress = () => bottomSheetRef.current.close();
  // handle modal open
  const handleOpenPress = (placeId) => {
    console.log(placeId);
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
        backgroundStyle={{ backgroundColor: "black" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <View style={tw("flex ")}>
          <TouchableOpacity
            onPress={handleClosePress}
            style={tw("bg-gray-600 rounded-full p-1 self-end right-4")}
          >
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>

          <ScrollView>
            {placeId && (
              <Text
                style={[
                  tw("m-4 text-white"),
                  { fontWeight: "800", fontSize: 25 },
                ]}
              >
                {placeId}
              </Text>
            )}
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
    height: "50%",
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default forwardRef(PlaceModal);
