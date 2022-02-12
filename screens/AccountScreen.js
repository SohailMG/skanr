import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { Image } from "react-native";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import {
  Avatar,
  Button,
  Checkbox,
  Incubator,
  RadioButton,
} from "react-native-ui-lib";
import { useRef } from "react";
const { TextField } = Incubator;
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
  const [activeForms, setActiveForms] = useState(false);

  const inputRef = useRef();
  const editForms = () => {
    setActiveForms(true);
    inputRef.current.focus();
  };

  return (
    <View style={{ backgroundColor: "#1E284F", flex: 1 }}>
      {/* Top view */}
      <View
        style={[
          tw("flex h-60 relative"),
          {
            backgroundColor: "#394464",
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          },
          styles.boxShadow,
        ]}
      >
        {/* top header */}
        <SafeAreaView style={tw("flex flex-row justify-between m-4")}>
          <TouchableOpacity
            disabled={true}
            onPress={editForms}
            style={[
              tw("flex flex-row items-center justify-center p-2 rounded-full "),
              { width: 90, backgroundColor: "#1E284F" },
              styles.boxShadow,
            ]}
          >
            <Text style={tw("font-semibold text-gray-400 mr-2")}>Edit</Text>
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={[
              tw(
                "flex justify-center flex-row items-center p-2 bg-white rounded-full "
              ),
              { width: 90, backgroundColor: "#1E284F" },
              styles.boxShadow,
            ]}
          >
            <Text style={tw("font-bold text-gray-400 mr-2")}>Logout</Text>
            <MaterialIcons name="logout" size={20} color="red" />
          </TouchableOpacity>
        </SafeAreaView>
        {/* Profile image */}
        <View
          style={[
            tw("absolute bottom-0 -mb-12 self-center rounded-full"),
            styles.boxShadow,
            {
              borderColor: "#464545",
              borderWidth: 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 21,
              borderTopWidth: 0,
            },
          ]}
        >
          <Image
            style={[tw("w-24 h-24  bg-white rounded-full")]}
            source={{ uri: user?.photoURL }}
          />
        </View>
      </View>

      {/* Middle view */}
      <View style={tw("flex mb-4 mt-10 h-40")}>
        <Text
          style={[
            tw("mt-4 text-gray-200 self-center"),
            { fontSize: 30, fontWeight: "600" },
          ]}
        >
          {user?.displayName}
        </Text>
        <View style={[tw("flex flex-row items-center"), styles.input]}>
          <MaterialIcons
            style={tw("mr-2")}
            name="email"
            size={24}
            color="lightgray"
          />
          <TextInput
            style={{ fontStyle: "italic" }}
            onBlur={() => setActiveForms(false)}
            ref={inputRef}
            editable={activeForms}
            value={user?.email}
          />
        </View>
        <View style={[tw("flex flex-row items-center"), styles.input]}>
          <Entypo style={tw("mr-2")} name="lock" size={24} color="lightgray" />
          <TextInput editable={activeForms} value={"********"} />
        </View>
      </View>

      {/* Prefrences */}
      <View style={tw("flex flex-row items-center")}>
        <TouchableOpacity
          onPress={() => setHalalChecked(!halalChecked)}
          style={[
            tw(
              `flex m-4 mt-10 ${
                halalChecked ? "bg-gray-200" : ""
              } items-center rounded-md`
            ),
            {
              flexDirection: "col",
              justifyContent: "center",
              width: 110,
              height: 110,
            },
            styles.boxShadow,
          ]}
        >
          <Image
            source={require("../assets/HalalSign.png")}
            style={tw("h-20 w-20")}
            resizeMode="contain"
          />
          <RadioButton color="gray" selected={halalChecked} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setveganChecked(!veganChecked)}
          style={[
            tw(
              `flex m-4 mt-10 ${
                veganChecked ? "bg-gray-200" : ""
              } items-center rounded-md`
            ),
            {
              flexDirection: "col",
              justifyContent: "center",
              width: 110,
              height: 110,
            },
            styles.boxShadow,
          ]}
        >
          <Image
            source={require("../assets/VegetarianMark.png")}
            style={tw("h-20 w-20")}
            resizeMode="contain"
          />
          <RadioButton color="gray" selected={veganChecked} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
    borderTopWidth: 0,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    color: "#999",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "#394464",
    width: "50%",
    borderRadius: 10,
  },
});
