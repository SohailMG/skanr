import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import tw from "tailwind-rn";
import { useDispatch } from "react-redux";
import {
  setImageUri,
  setIsScanning,
  setMessage,
} from "../slices/locationSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import cloudVision from "../cloude-vision";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

const CameraScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanning, setScanning] = useState(false);
  const [imagePath, setImagePath] = useState(null);

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
    let result = await fetchImageLabels(base64);
    // text blocks detected in the image
    const { textAnnotations } = result.responses[0];
    setScanning(false);
  };

  const fetchImageLabels = async (base64) => {
    cloudVision.reqBody.requests[0].image.content = base64;
    return await fetch(cloudVision.url + cloudVision.apiKey, {
      method: "POST",
      body: JSON.stringify(cloudVision.reqBody),
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
          visible={scanning}
          textContent="taking picture"
          textStyle={{ color: "white" }}
        />
        <View
          style={[
            tw("items-end justify-center"),
            {
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            },
          ]}
        >
          {/* return to screen button */}
          <View style={tw("absolute bottom-5 left-4 ")}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
                dispatch(setMessage(false));
              }}
              style={[
                tw(
                  "bg-white w-20 rounded-full mb-10 flex items-center justify-center"
                ),
                {},
              ]}
            >
              <Ionicons name="ios-return-down-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* take a picture button */}
          <View>
            <TouchableOpacity
              onPress={takePicture}
              style={[
                tw(
                  "bg-white w-20 h-20 rounded-full mb-10 flex items-center justify-center"
                ),
                {},
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
      </Camera>
    </View>
  );
};

export default CameraScreen;
