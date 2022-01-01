import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import tw from "tailwind-rn";
import { useDispatch } from "react-redux";
import { setIsScanning, setMessage } from "../slices/locationSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const CameraScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef().current;

  // taking a picture
  const takePicture = async () => {
    const options = { quality: 0.5, base64: true, skipProcessing: false };
    const picture = camRef.takePictureAsync(options);

    if (picture.source) console.log(picture.source);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
                  navigation.navigate('Home')
                  dispatch(setMessage(false))
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
