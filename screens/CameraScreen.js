import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import tw from "tailwind-rn";
import { useDispatch } from "react-redux";
import { setImageUri, setIsScanning, setMessage } from "../slices/locationSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
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
    const photo = await camRef.current.takePictureAsync();
    const source = photo.uri;
    setScanning(false);
    dispatch(setImageUri(source));
    console.log(source);
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
