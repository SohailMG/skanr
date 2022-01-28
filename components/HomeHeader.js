import { View, Text, Image } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { Entypo } from "@expo/vector-icons";
const HomeHeader = () => {
  const { user } = useAuth();
  return (
    <View style={tw("flex flex-row justify-between items-center")}>
      <View style={tw("flex")}>
        <Text style={tw("flex flex-row items-center text-gray-500")}>
          Welcome
          <Entypo name="hand" size={20} color="orange" style={tw("ml-2")} />
        </Text>
        {user.displayName && (
          <Text style={[tw("text-xl font-semibold text-gray-800")]}>
            {user.displayName.split(" ")[0]}!
          </Text>
        )}
      </View>
      {user.photoURL && (
        <Image
          style={[tw("w-10 h-10 rounded-full ")]}
          source={{ uri: user?.photoURL }}
        />
      )}
    </View>
  );
};

export default HomeHeader;
