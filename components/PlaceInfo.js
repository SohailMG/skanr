import { View, Text, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import tw from "tailwind-rn";
const PlaceInfo = ({ placeDetails, isHalal }) => {
  const { rating, name } = placeDetails;
  //   console.log(placeDetails);
  return (
    <View
      style={[
        tw("flex  items-center bg-white p-4 rounded-md mx-6 "),
        { width: 340 },
      ]}
    >
      <View style={tw("flex flex-row items-center ")}>
        <View
          style={[
            tw("flex flex-row items-center bg-gray-100 p-2 rounded-full"),
          ]}
        >
          <Text style={tw("mr-2 text-gray-800 font-semibold")}>Halal</Text>
          {isHalal ? (
            <AntDesign
              style={tw("ml-2")}
              name="checkcircle"
              size={20}
              color="green"
            />
          ) : (
            <Entypo name="circle-with-cross" size={20} color="red" />
          )}
        </View>
        <View
          style={tw(
            "flex ml-2 flex-row items-center bg-gray-100 p-2 rounded-full"
          )}
        >
          <Text style={tw("mr-2 font-semibold text-gray-800")}>{rating}</Text>
          <AntDesign name="star" size={20} color="yellow" />
        </View>
      </View>
      <View style={tw("flex flex-row items-start mt-4")}>
        <MaterialIcons name="food-bank" size={30} color="orange" />
        <Text
          style={tw("mb-2 text-3xl text-center text-gray-800 font-semibold")}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export default PlaceInfo;
const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
