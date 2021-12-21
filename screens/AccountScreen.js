import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const AccountScreen = () => {
  const { logout, user } = useAuth();
  return (
    <SafeAreaView>
      {/* Header */}
      <View style={tw("items-center")}>
        <Text style={tw("font-semibold text-md ")}>Account</Text>
      </View>

      {/* Account details */}
      <View style={tw("items-center mt-20 flex")}>
        <Image
          style={tw("h-20 w-20 rounded-full")}
          source={{ uri: user.photoURL }}
        />
        <Text style={[tw("mt-4 font-semibold text-gray-800")]}>
          Name : {user.displayName}
        </Text>
        <Text style={[tw("mt-4 font-semibold text-gray-800")]}>
          Email: {user.email}
        </Text>
        <TouchableOpacity
          style={[
            tw("flex flex-row items-center mt-10 bg-white p-2 rounded-full"),
            {
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            },
          ]}
          onPress={logout}
        >
          <Text style={tw("mx-2 text-gray-800 font-bold")}>Logout</Text>
          <AntDesign name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
