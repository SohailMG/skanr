import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Checkbox } from "react-native-ui-lib";

const catagories = {
  13377: "vegan",
  13191: "Halal",
  13309: "Middle Eastern",
  13356: "Turkish",
};

const AccountScreen = () => {
  const { logout, user } = useAuth();
  const [halalChecked, setHalalChecked] = useState(false);
  const [veganChecked, setveganChecked] = useState(false);
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
        {/* Prefrence options */}
        <View style={tw("self-start ml-4")}>
          <View style={tw("flex flex-row items-center")}>
            <Text style={tw("text-lg text-gray-500 font-light mt-4 mb-4 mr-2")}>
              Set your dietary preference
            </Text>
            <AntDesign name="setting" size={20} color="black" />
          </View>
          <View
            style={tw("flex flex-row items-center bg-white rounded-md p-4")}
          >
            <Checkbox
              color="green"
              label="Halal"
              value={halalChecked}
              onValueChange={() => setHalalChecked(!halalChecked)}
              containerStyle={{}}
            />
            <Checkbox
              color="green"
              label="Vegetarian"
              value={veganChecked}
              onValueChange={() => setveganChecked(!veganChecked)}
              containerStyle={{ marginHorizontal: 10 }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={logout}
          style={tw(
            "w-64 flex flex-row mt-10  items-center justify-center p-3 rounded-xl  bg-red-400"
          )}
        >
          <Text style={tw("text-center font-semibold mr-4 text-white text-xl")}>
            Sign out
          </Text>
          <AntDesign name="logout" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
