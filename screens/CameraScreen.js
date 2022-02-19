import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Camera } from "expo-camera";
import tw from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { setImageUri, setIsScanning } from "../slices/appSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import BackHomeButton from "../components/BackHomeButton";
import useLocation from "../hooks/useLocation";
import ScrollingButtonMenu from "react-native-scroll-menu";
import { WaveIndicator } from "react-native-indicators";
import { setDiateryPref } from "../slices/placeDataSlice";
import PlaceModal from "../components/PlaceModal";
import { fetchNearbyPlaces } from "../modules/PlacesApi";
import { classifyImage, resizeImage } from "../modules/VisionAi";
import { Button } from "react-native-ui-lib";
import { Feather } from "@expo/vector-icons";

const options = [
  {
    id: 1,
    name: "chicken",
  },
  {
    id: 2,
    name: "pizza",
  },
  {
    id: 3,
    name: "indian",
  },
  {
    id: 4,
    name: "kebab",
  },
];
const CameraScreen = () => {
  // hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userLocation } = useSelector((state) => state.appReducer);

  // ref to child component
  const childRef = useRef();

  // states
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanning, setScanning] = useState(false);
  const [scanFailed, setScanFailed] = useState(false);
  const [failedDetection, setFailedDetection] = useState(false);
  const [placeNotFound, setPlaceNotFound] = useState(false);
  const [selectedOptions, setSelectedOption] = useState("chicken");
  const [place, setPlace] = useState(null);

  const camRef = useRef(null);

  // taking a picture
  const takePicture = async () => {
    try {
      setScanning(true);
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      // capturing the picture
      const photo = await camRef.current.takePictureAsync(options);
      // storing image url to global redux store
      dispatch(setImageUri(photo.uri));
      // resizing image and decoding to base64
      const base64 = await resizeImage(photo);
      // performing object detection on decoded image
      const result = await classifyImage(base64);
      // text blocks detected in the image

      console.log(result);
      const { labelAnnotations, fullTextAnnotation } = result.responses[0];

      if (!fullTextAnnotation) {
        setScanFailed(true);
        setScanning(false);
        setFailedDetection(labelAnnotations[0].description);
        // alert("Detection failed!.Make sure restaurant name is visible");
        return;
      }
      // getting placeId of closest match
      const fullText = Array.from(
        new Set(fullTextAnnotation.text.split("\n"))
      ).join(" ");

      const { placeId, text, score } = await fetchNearbyPlaces(
        userLocation,
        fullText
      );
      console.log("place Id " + placeId);
      if (!placeId) setPlaceNotFound(true);
      setScanning(false);
      setPlace(placeId);
      childRef.current.handleOpenPress(placeId);
      // navigation.navigate("Results");
    } catch (err) {
      setScanning(false);
    }
  };

  // resize image to cloud vision's preference 640x640

  useEffect(() => {
    dispatch(setDiateryPref(options[0].name));
    // Getting Camera permissions
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (hasPermission) dispatch(setIsScanning(true));
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={tw("flex-1")}>
      <Camera ref={camRef} style={tw("flex-1")} type={type}>
        <Modal
          style={[tw("flex justify-center items-center")]}
          isVisible={scanFailed}
        >
          <View
            style={[
              tw("bg-white  items-center rounded-xl p-4"),
              { width: "90%" },
            ]}
          >
            <Feather name="frown" size={24} color="red" />
            <Text style={[tw("text-gray-800 my-2 ")]}>
              Detected a{" "}
              {
                <Text style={tw("text-gray-800 font-semibold")}>
                  {failedDetection}
                </Text>
              }{" "}
              instead of place banner
            </Text>
            <Text style={[tw("text-gray-800 ")]}>
              Make sure place banner is visible
            </Text>
            <Button
              style={[tw("w-32 self-center mt-2")]}
              label="Try again"
              onPress={() => setScanFailed(false)}
            />
          </View>
        </Modal>
        <Spinner
          animation="fade"
          color="green"
          visible={scanning}
          textStyle={{ color: "white" }}
          style={tw("flex flex-row items-center justify-center")}
        >
          <WaveIndicator color="white" size={60} />
          <Text
            style={[tw("absolute  text-white self-center"), { top: "55%" }]}
          >
            Scanning Image...
          </Text>
        </Spinner>

        <Text style={tw("absolute mb-20 bottom-32 self-center text-white")}>
          Take a picture of the front of the restaurant
        </Text>
        <View
          style={[
            tw("items-end  justify-center"),
            {
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            },
          ]}
        >
          {/* return to screen button */}

          <View style={tw("absolute bottom-0 left-4 ")}>
            <BackHomeButton />
          </View>
          {/* take a picture button */}
          <View style={tw("p-1 border border-white rounded-full ")}>
            <TouchableOpacity
              onPress={takePicture}
              style={[
                tw(
                  "bg-white w-20 h-20 rounded-full  flex items-center justify-center"
                ),
                styles.shadowStyle,
              ]}
            >
              <Ionicons
                style={tw("ml-1")}
                name="scan-outline"
                size={60}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw("mb-10 items-center h-14 ")}>
          <ScrollingButtonMenu
            buttonStyle={{ borderRadius: 50 }}
            items={options}
            onPress={(e) => {
              console.log(e);
              dispatch(setDiateryPref(e.name));
              setSelectedOption(e);
            }}
            selected={selectedOptions?.id ? selectedOptions.id : 1}
          />
        </View>
      </Camera>
      <PlaceModal scanFailed={placeNotFound} ref={childRef} placeId={place} />
    </View>
  );
};

export default CameraScreen;
const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
