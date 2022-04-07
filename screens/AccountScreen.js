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
  Switch,
} from "react-native-ui-lib";
import { useRef } from "react";
import HalalIcon from "../assets/halalIcon.svg";
import VeganIcon from "../assets/veganIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../slices/themeSlice";
import { setDiateryPref } from "../slices/placeDataSlice";
import { deleteRecents } from "../controllers/dbHandlers";

const { TextField } = Incubator;

const AccountScreen = () => {
  const dispatch = useDispatch();
  const { logout, user } = useAuth();
  const { theme } = useSelector((state) => state.themeReducer);
  const [halalChecked, setHalalChecked] = useState(false);
  const [veganChecked, setveganChecked] = useState(false);
  const [activeForms, setActiveForms] = useState(false);
  const [appTheme, setAppTheme] = useState(true);

  const inputRef = useRef();
  const editForms = () => {
    setActiveForms(true);
    inputRef.current.focus();
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      {/* Top view */}
      <SafeAreaView style={tw("flex flex-row justify-between m-4")}>
        <TouchableOpacity
          disabled={true}
          onPress={editForms}
          style={[
            tw("flex flex-row items-center justify-center p-2 rounded-xl "),
            { width: 90, backgroundColor: theme.foreground },
          ]}
        >
          <Text
            style={[
              tw("font-semibold text-gray-200 mr-2"),
              { color: theme.fontColor },
            ]}
          >
            Edit
          </Text>
          <AntDesign
            name="edit"
            size={20}
            color={theme.fontColor}
            onPress={editForms}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={[
            tw(
              "flex justify-center flex-row items-center p-2 bg-white rounded-xl "
            ),
            { width: 90, backgroundColor: theme.foreground },
          ]}
        >
          <Text
            style={[
              tw("font-bold text-gray-200 mr-2"),
              { color: theme.fontColor },
            ]}
          >
            Logout
          </Text>
          <MaterialIcons name="logout" size={20} color={theme.fontColor} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Middle view */}
      <View style={tw("flex mb-4")}>
        <View style={tw("self-center")}>
          <Avatar
            size={80}
            source={{ uri: user?.photoURL }}
            label={user?.displayName[0].toUpperCase()}
          />
        </View>
        <Text
          style={[
            tw("my-2  self-center"),
            { fontSize: 30, fontWeight: "600", color: theme.fontColor },
          ]}
        >
          {user?.displayName}
        </Text>
        <View
          style={[
            tw("flex mt-2 flex-row items-center self-center"),
            styles.input,
            { backgroundColor: theme.foreground },
          ]}
        >
          <MaterialIcons
            style={tw("mr-2")}
            name="email"
            size={24}
            color="lightgray"
          />
          <TextInput
            style={{ fontStyle: "italic", color: theme.fontColor }}
            onBlur={() => setActiveForms(false)}
            ref={inputRef}
            editable={activeForms}
            value={user?.email}
          />
        </View>
      </View>

      {/* Prefrences */}
      <Text
        style={[
          tw("ml-4 text-xl font-semibold mr-2"),
          { color: theme.fontColor },
        ]}
      >
        Dietary Preferences
      </Text>
      <View style={tw("flex flex-row items-center")}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setDiateryPref("halal"));
            setHalalChecked(!halalChecked);
          }}
          style={[
            tw(
              `flex m-4 mt-10  ${
                halalChecked ? "bg-gray-200" : ""
              } items-center rounded-md`
            ),
            {
              flexDirection: "col",
              justifyContent: "center",
              width: 120,
              height: 120,
            },
          ]}
        >
          <HalalIcon />
          <RadioButton
            style={{ marginTop: 2 }}
            color="gray"
            selected={halalChecked}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setDiateryPref("vegan"));
            setveganChecked(!veganChecked);
          }}
          style={[
            tw(
              `flex m-4 mt-10  ${
                veganChecked ? "bg-gray-200 " : ""
              } items-center rounded-xl`
            ),
            {
              flexDirection: "col",
              justifyContent: "center",
              width: 120,
              height: 120,
            },
          ]}
        >
          <VeganIcon />
          <RadioButton
            style={{ marginTop: 2 }}
            color="gray"
            selected={veganChecked}
          />
        </TouchableOpacity>
      </View>
      <View style={tw("ml-4 mt-2 flex flex-row items-center")}>
        <Text
          style={[
            tw("text-xl font-semibold  mr-2"),
            { color: theme.fontColor },
          ]}
        >
          Switch Theme
        </Text>
        <Switch
          onColor={"black"}
          offColor={"gray"}
          value={appTheme}
          onValueChange={() => {
            setAppTheme(!appTheme);
            dispatch(setTheme(!appTheme));
          }}
        />
      </View>

      <TouchableOpacity
        style={[
          tw(
            " self-center ml-4 mt-10  rounded-xl p-2 w-40 flex flex-row items-center"
          ),
          { backgroundColor: theme.foreground },
        ]}
        onPress={() => deleteRecents(user.uid)}
      >
        <Text style={[tw("text-lg font-semibold  mr-2"), { color: "red" }]}>
          Clear Recents
        </Text>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
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
    width: "50%",
    borderRadius: 10,
  },
});
