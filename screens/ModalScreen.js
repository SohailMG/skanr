import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-rn";
import axios from "axios";
import { Colors, Button, Incubator } from "react-native-ui-lib";
import Logo from "../assets/logo.svg";
import RegisterSvg from "../assets/register.svg";
import useAuth from "../hooks/useAuth";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const ModalScreen = () => {
  const { createAccountAndLogin } = useAuth();
  const { TextField } = Incubator;
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(
    "https://avatars.dicebear.com/api/male/default.png"
  );

  const { theme } = useSelector((state) => state.themeReducer);
  // sets user avatar
  const fetchAvatar = async () => {
    const response = await axios.get(
      `https://avatars.dicebear.com/api/male/${fullName.toLowerCase()}.png`
    );
    setAvatar(response.request.responseURL);
  };

  return (
    <View style={[tw("flex-1"), { backgroundColor: theme.background }]}>
      <View style={tw("flex items-center mt-10")}>
        <Logo />
      </View>
      <View style={tw("flex mt-2 mx-6 flex-row items-center")}>
        <Text style={tw("text-3xl w-48 font-semibold text-gray-600")}>
          Let's get you started!
        </Text>
        <RegisterSvg />
      </View>
      {/* Input fields */}
      <View style={tw("flex mt-4")}>
        {/* Avatar */}
        <View style={tw("mt-4 self-center")}>
          <Image
            source={{
              uri: avatar,
            }}
            resizeMode={"contain"}
            style={tw("w-20 h-20 border-2 border-gray-300  rounded-full")}
          />
        </View>
        <View style={[tw("m-4  py-4 px-4")]}>
          <View
            style={[
              tw("flex flex-row mt-4 items-end p-2 rounded-xl"),
              { backgroundColor: "#EEEEEE" },
            ]}
          >
            <Ionicons name="person" style={tw("mr-2")} size={30} color="gray" />
            <TextField
              keyboardAppearance="dark"
              keyboardType="name"
              containerStyle={{ width: 200 }}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              autoComplete="name"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.white,
                default: Colors.grey30,
              }}
              text65M
            />
          </View>
          {/* full name */}
          <View
            style={[
              tw("flex flex-row mt-4 items-end p-2 rounded-xl"),
              { backgroundColor: "#EEEEEE" },
            ]}
          >
            <MaterialIcons
              name="email"
              style={tw("mr-2")}
              size={30}
              color="gray"
            />
            <TextField
              keyboardAppearance="dark"
              keyboardType="email-address"
              containerStyle={{ width: 200 }}
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoComplete="email"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.white,
                default: Colors.grey30,
              }}
              text65M
            />
          </View>
          {/* email address */}
          <View
            style={[
              tw("flex flex-row mt-4 items-end p-2 rounded-xl"),
              { backgroundColor: "#EEEEEE" },
            ]}
          >
            <MaterialIcons
              style={tw("mr-2")}
              name="lock"
              size={30}
              color="gray"
            />
            <TextField
              keyboardAppearance="dark"
              keyboardType="password"
              containerStyle={{ width: 200 }}
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoComplete="password"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.white,
                default: Colors.grey30,
              }}
              text65M
            />
          </View>
        </View>
      </View>
      <View style={tw("flex items-center mt-6")}>
        <TouchableOpacity
          disabled={!email || !password || !fullName}
          onPress={() =>
            createAccountAndLogin(email, password, fullName, avatar)
          }
          style={[
            tw(
              `flex flex-row items-center ${
                !email || !password || !fullName
                  ? "border border-gray-500"
                  : "bg-gray-800"
              } p-4 rounded-xl w-40 justify-center  self-center`
            ),
          ]}
        >
          <Text style={tw("text-2xl font-semibold text-gray-200 mr-2")}>
            Submit
          </Text>
          <Entypo name="check" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalScreen;
const styles = StyleSheet.create({
  container: {},
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4,
  },
  withFrame: {
    borderWidth: 1,
    borderColor: Colors.grey40,
    padding: 4,
    borderRadius: 2,
  },
  boxShadow: {
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
