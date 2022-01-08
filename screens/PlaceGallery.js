import { View, Text, SafeAreaView, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
import { ScrollView } from "react-native-gesture-handler";
import { Gallery } from "react-native-gallery-view";
const PlaceGallery = () => {
  const navigation = useNavigation();
  const { placeImages } = useSelector((state) => state.placeReducer);

  return (
    <SafeAreaView style={tw("flex-1 items-center")}>
      <Text style={tw("text-lg font-semibold")}>Foods Gallery</Text>

      {/* Gallery view */}
      <View style={tw("")}>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Gallery loaderColor="yellow" images={placeImages} activeIndex={0} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PlaceGallery;
