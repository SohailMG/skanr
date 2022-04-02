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
  Alert,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import tw from "tailwind-rn";
import { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import PlaceDetails from "./PlaceDetails";
import { saveScanResults } from "../controllers/dbHandlers";

const PlaceModal = ({ placeId, scanFailed, setPlaceNotFound }, ref) => {
  // const { placeId } = useSelector((state) => state.appReducer);
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
    console.log(scanFailed);
    if (index === -1) setClosedModal(true);
  }, []);

  // handle modal close
  const handleClosePress = () => {
    setPlaceNotFound(false);
    bottomSheetRef.current.close();
    Alert.alert(
      "Scan Results",
      "Was the scanned place correct?",
      [
        {
          text: "No",
          onPress: () => saveScanResults("FailedScans"),
          style: "destructive",
        },
        {
          text: "Yes",
          onPress: () => saveScanResults("SuccessfulScans"),
          style: "default",
        },
      ],
      
      {
        cancelable: true,
        onDismiss: () =>
          console.log(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };
  // handle modal open
  const handleOpenPress = () => {
    try {
      setClosedModal(false);
      setIndex(1);
    } catch (error) {
      console.error("EROR ", error);
    }
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
            {scanFailed && (
              <View style={tw("flex items-center justify-center")}>
                <Text style={tw("text-2xl my-2 text-gray-500 justify-center ")}>
                  Couldn't find place, Try again!
                </Text>
                <Feather name="frown" size={60} color="white" />
              </View>
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
    height: "60%",
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default forwardRef(PlaceModal);
