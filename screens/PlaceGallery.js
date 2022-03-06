import { View, Text, SafeAreaView, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
import { ScrollView } from "react-native-gesture-handler";
import { Gallery } from "react-native-gallery-view";
import { useEffect, useState } from "react";
import { classifyBatchOfImages } from "../modules/VisionAi";
import { fetchPlaceGallery } from "../controllers/dbHandlers";
import { image } from "@tensorflow/tfjs";
import { Button } from "react-native-ui-lib";
import ScrollingButtonMenu from "react-native-scroll-menu";
import ImageModal from "react-native-image-modal";
import Loading from "../components/loaders/Loading";

const PlaceGallery = () => {
  const navigation = useNavigation();
  const [placeGallery, setPlaceGallery] = useState(null);
  const [imageLabels, setImageLabels] = useState(null);
  const [currentActive, setCurrentActive] = useState({
    name: "general",
    id: 10,
  });
  const [loading, setLoading] = useState(false);
  const { placeImages, placeData } = useSelector((state) => state.placeReducer);
  const { theme } = useSelector((state) => state.themeReducer);

  // extracts image labels
  const extractLabels = () => {
    const labelsSet = new Set();
    placeGallery?.map(({ imageUri, labels }) => {
      labels.forEach((label) => labelsSet.add(label));
    });
    const labelsArr = Array.from(labelsSet).map((label, index) => ({
      name: label,
      id: index + 10,
    }));
    setImageLabels(labelsArr);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const gallery = await fetchPlaceGallery(placeData.placeId);
        if (!gallery) {
          const labelledImages = await classifyBatchOfImages(
            placeImages,
            placeData.placeId
          );
          setPlaceGallery(labelledImages);
        } else {
          setPlaceGallery(gallery.labelledImages);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, [placeData]);

  useEffect(() => {
    extractLabels();
  }, [placeGallery]);

  if (loading)
    return <Loading text={"loading images...."} color={theme.background} />;

  return (
    <SafeAreaView
      style={[tw("flex-1 items-center"), { backgroundColor: theme.background }]}
    >
      <Text style={tw("text-lg font-semibold text-gray-600 mt-4")}>
        Place Gallery
      </Text>
      {/* label buttons */}
      <View style={tw(" items-center h-14 mt-4")}>
        {imageLabels && (
          <ScrollingButtonMenu
            buttonStyle={{ borderRadius: 50 }}
            items={imageLabels}
            onPress={(e) => {
              setCurrentActive(e);
            }}
            selected={currentActive.id ? currentActive.id : 10}
          />
        )}
      </View>
      {/* Gallery view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            tw("mt-10 items-center justify-center ml-4 flex flex-row"),
            { flexWrap: "wrap" },
          ]}
        >
          {placeGallery?.map(
            (image) =>
              image.labels.includes(currentActive.name) && (
                <View key={image.imageUri}>
                  <ImageModal
                    style={tw("h-40 w-40 m-2 rounded-xl")}
                    resizeMode="contain"
                    source={{
                      uri: image.imageUri,
                    }}
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
