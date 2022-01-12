import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import tw from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageUri,
  setIsScanning,
  setMessage,
  setPlaceId,
  setPlaceIds,
  setScannedText,
} from "../slices/appSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import CLOUD_VISION from "../cloude-vision";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import BackHomeButton from "../components/BackHomeButton";
import useLocation from "../hooks/useLocation";
import ScrollingButtonMenu from "react-native-scroll-menu";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
const options = [
  {
    id: 1,
    name: "Chicken",
  },
  {
    id: 2,
    name: "Pizza",
  },
  {
    id: 3,
    name: "Kebab",
  },
  {
    id: 4,
    name: "Indian",
  },
];
const CameraScreen = () => {
  // hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userLocation } = useSelector((state) => state.appReducer);

  // states
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanning, setScanning] = useState(false);
  const [scanFailed, setScanFailed] = useState(false);
  const [selectedOptions, setSelectedOption] = useState(null);

  const camRef = useRef(null);

  // taking a picture
  const takePicture = async () => {
    setScanning(true);
    const options = { quality: 0.5, base64: true, skipProcessing: false };
    // capturing the picture
    const photo = await camRef.current.takePictureAsync(options);
    // storing image url to global redux store
    dispatch(setImageUri(photo.uri));
    // resizing image and decoding to base64
    const base64 = await resizeImage(photo);
    // performing object detection on decoded image
    const result = await fetchImageLabels(base64);
    // text blocks detected in the image
    const { labelAnnotations, textAnnotations } = result.responses[0];
    if (!textAnnotations) {
      setScanFailed(true);
      setScanning(false);
      alert("Detection failed!.Make sure restaurant name is visible");
      return;
    }
    console.log("success");
    const extractedText = textAnnotations[0].description;
    dispatch(setScannedText(extractedText));
    const placeId = await fetchPlaceIds(textAnnotations);
    dispatch(setPlaceId(placeId));
    setScanning(false);
    navigation.navigate("Results");
  };

  const fetchImageLabels = async (base64) => {
    CLOUD_VISION.reqBody.requests[0].image.content = base64;
    return await fetch(CLOUD_VISION.url + CLOUD_VISION.apiKey, {
      method: "POST",
      body: JSON.stringify(CLOUD_VISION.reqBody),
    }).then(
      (response) => {
        return response.json();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // resize image to cloud vision's preference 640x640
  const resizeImage = async (image) => {
    const resizedImgObject = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [{ resize: { width: 500, height: 500 } }],
      { compress: 0, format: ImageManipulator.SaveFormat.JPEG }
    );

    const base64 = await FileSystem.readAsStringAsync(resizedImgObject.uri, {
      encoding: "base64",
    });
    return base64;
  };

  const fetchPlaceIds = async (extractedText) => {
    // console.log(selectedOptions);
    return axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          userLocation?.coords.latitude
        },${
          userLocation?.coords.longitude
        }&radius=500&type=restaurant&keyword=${"chicken"}&key=${GOOGLE_PLACES_API_KEY}`
      )
      .then((response) => {
        const { results } = response.data;
        for (let place of results) {
          for (let textBlock of extractedText) {
            // console.log(textBlock.description, place.name);
            if (
              place.name
                .toLowerCase()
                .includes(textBlock.description.toLowerCase().trim())
            ) {
              // console.log("from camera -M " + place.place_id);
              return place.place_id;
            }
          }
        }
        // checkMatchingPlace(results);
        // setPlaceIds(results);
      });
  };
  useEffect(() => {
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
              setSelectedOption(e);
            }}
            selected={selectedOptions?.id ? selectedOptions.id : 1}
          />
        </View>
      </Camera>
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
