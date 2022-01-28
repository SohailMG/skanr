import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-rn";
import axios from "axios";
import { Colors, Button, Incubator } from "react-native-ui-lib";
import { auth } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { singInWithFirebase } = useAuth();
  const { TextField } = Incubator;
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(
    "https://avatars.dicebear.com/api/male/default.png"
  );

  // sets user avatar
  const fetchAvatar = async () => {
    const response = await axios.get(
      `https://avatars.dicebear.com/api/male/${fullName.toLowerCase()}.png`
    );
    setAvatar(response.request.responseURL);
  };

  return (
    <KeyboardAvoidingView>
      <View style={tw("flex items-center mt-4")}>
        <Image
          source={require("../assets/appLogo.png")}
          style={tw("h-40 w-40")}
          resizeMode={"contain"}
        />
        <Text style={tw("text-3xl font-semibold text-gray-800")}>Sign Up</Text>
      </View>
      {/* Input fields */}
      <View style={tw("flex")}>
        {/* Avatar */}
        <View style={tw("mt-4 self-center")}>
          <Image
            source={{
              uri: avatar,
            }}
            resizeMode={"contain"}
            style={tw("w-40 h-40 border-2 border-gray-300  rounded-full")}
          />
        </View>
        <View style={[tw("m-4  py-4 px-4"), { width: "60%" }]}>
          {/* full name */}
          <TextField
            placeholder="Enter full name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
            }}
            onBlur={() => fetchAvatar()}
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.yellow5,
              default: Colors.grey30,
            }}
            text70L
            fieldStyle={styles.withUnderline}
          />
          {/* email address */}
          <TextField
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter email"
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.yellow5,
              default: Colors.grey30,
            }}
            text70L
            containerStyle={{ marginTop: 10 }}
            fieldStyle={styles.withUnderline}
          />
          {/* password */}
          <TextField
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter password"
            containerStyle={{ marginTop: 10 }}
            floatingPlaceholder
            text70L
            floatingPlaceholderColor={{
              focus: Colors.yellow5,
              default: Colors.grey30,
            }}
            fieldStyle={styles.withUnderline}
          />
        </View>
      </View>
      <View style={tw("flex items-center mt-10")}>
        <Button
          onPress={() => singInWithFirebase(email, password, fullName, avatar)}
          backgroundColor="#FB3C62"
          label="Submit"
          borderRadius={7}
          style={{ height: 45, marginBottom: 10, width: 200 }}
        />
      </View>
    </KeyboardAvoidingView>
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
});
