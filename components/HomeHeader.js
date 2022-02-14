import { View, Text, Image, ActivityIndicator } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons";
const HomeHeader = ({ userAddress }) => {
  const { user } = useAuth();
  return (
    <View style={tw("flex flex-row justify-between items-center")}>
      <View style={tw("flex p-4")}>
        <Text style={tw("flex flex-row items-center text-gray-100")}>
          Welcome
          <Entypo name="hand" size={20} color="orange" style={tw("ml-2")} />
        </Text>
        {user.displayName && (
          <Text style={[tw("text-4xl font-semibold text-gray-100")]}>
            {user.displayName.split(" ")[0]}!
          </Text>
        )}
        <View style={[tw(" flex flex-row items-end")]}>
          <Ionicons name="location" size={20} color="gray" />
          <Text style={tw("font-semibold text-gray-500")}>
            {userAddress ? userAddress : "Updating location"}
          </Text>
          {!userAddress && <ActivityIndicator size="small" color="green" />}
        </View>
      </View>
      {user.photoURL && (
        <Image
          style={[tw("w-12 h-12 rounded-full ")]}
          source={{ uri: user?.photoURL }}
        />
      )}
    </View>
  );
};

export default HomeHeader;
