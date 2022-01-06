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
    <SafeAreaView style={{ backgroundColor: "#EEEAD8", flex: 1 }}>
      {/* Header */}
      <View style={tw("items-center")}>
        <Text style={tw("font-semibold text-md ")}>Account</Text>
      </View>

      {/* Account details */}
      <View style={[tw("items-center mt-20 flex")]}>
        <Image
          style={tw("h-20 w-20 rounded-full")}
          source={{ uri: user.photoURL }}
        />
        <View style={tw("self-start m-2 p-2 flex")}>
          <Text style={tw("mb-2 mt-2")}>Name</Text>
          <Text
            style={tw("text-lg mb-2  text-gray-400 bg-white p-2 rounded-lg")}
          >
            {user.displayName}
          </Text>
          <Text style={tw("mb-2 mt-2")}>Email</Text>
          <Text
            style={tw("text-lg  text-lg text-gray-400 bg-white p-2 rounded-lg")}
          >
            {user.email}
          </Text>
        </View>
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
