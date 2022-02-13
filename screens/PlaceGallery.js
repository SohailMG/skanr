import { View, Text, SafeAreaView, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
import { ScrollView } from "react-native-gesture-handler";
import { Gallery } from "react-native-gallery-view";
import { useEffect, useState } from "react";
import { classifyBatchOfImages } from "../modules/VisionAi";
import { fetchPlaceGallery } from "../controllers/db-controllers";
import { image } from "@tensorflow/tfjs";
import { Button } from "react-native-ui-lib";
import Spinner from "react-native-loading-spinner-overlay";
import { WaveIndicator } from "react-native-indicators";
const PlaceGallery = () => {
  const navigation = useNavigation();
  const [placeGallery, setPlaceGallery] = useState(null);
  const [imageLabels, setImageLabels] = useState(null);
  const [currentActive, setCurrentActive] = useState({ label: null, index: 0 });
  const { placeImages, placeData } = useSelector((state) => state.placeReducer);

  // extracts image labels
  const extractLabels = () => {
    const labelsSet = new Set();
    placeGallery?.map(({ imageUri, labels }) => {
      labels.forEach((label) => labelsSet.add(label));
    });
    const labelsArr = Array.from(labelsSet);
    setCurrentActive({ label: labelsArr[0], index: 0 });
    setImageLabels(labelsArr);
  };

  useEffect(() => {
    (async () => {
      const gallery = await fetchPlaceGallery(placeData.placeId);
      if (!gallery) {
        const labelledImages = await classifyBatchOfImages(
          placeImages,
          placeData.placeId
        );
        setPlaceGallery(labelledImages);
      } else setPlaceGallery(gallery.labelledImages);
    })();
  }, [placeData]);

  useEffect(() => {
    extractLabels();
  }, [placeGallery]);

  if (!placeGallery) {
    return (
      <View style={[tw("flex-1 items-center"), { backgroundColor: "#1E284F" }]}>
        <Spinner
          animation="fade"
          color="green"
          visible={!placeGallery}
          textStyle={{ color: "white" }}
          style={tw("flex flex-row items-center justify-center")}
        >
          <WaveIndicator color="white" size={60} />
          <Text
            style={[tw("absolute  text-white self-center"), { top: "55%" }]}
          >
            Loading Images....
          </Text>
        </Spinner>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[tw("flex-1 items-center"), { backgroundColor: "#1E284F" }]}
    >
      <Text style={tw("text-lg font-semibold text-white")}>Place Gallery</Text>

      {/* Gallery view */}
      <View style={tw("mt-10 mx-4 h-10")}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          indicatorStyle="white"
          horizontal
        >
          {imageLabels?.map((label, index) => (
            <Button
              key={index}
              onPress={() => setCurrentActive({ label, index })}
              style={[tw("h-10")]}
              label={label === "general" ? "All" : label}
              size={Button.sizes.medium}
              backgroundColor={
                index === currentActive.index ? "#394464" : "transparent"
              }
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            tw("mt-10 items-center justify-center ml-4 flex flex-row"),
            { flexWrap: "wrap" },
          ]}
        >
          {placeGallery?.map(
            (image) =>
              image.labels.includes(currentActive.label) && (
                <View>
                  <Image
                    source={{ uri: image.imageUri }}
                    style={tw("h-40 w-40 m-2 rounded-md")}
                  />
                </View>
              )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceGallery;

// Cheat meals
