import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Button, Incubator } from "react-native-ui-lib";
import React, { useState, useEffect } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { TextField } = Incubator;
  const { loginUser, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={[
        tw("flex flex-col  p-4 self-center rounded-md"),
        { width: "90%", backgroundColor: "rgba(255, 255, 255, 0.50)" },
        ,
      ]}
    >
      <Text style={tw("text-3xl self-center font-semibold")}>Sign In</Text>
      <View style={tw("mt-10 mb-10")}>
        <View style={tw("flex flex-row items-end")}>
          <MaterialIcons
            style={tw("mr-2")}
            name="email"
            size={30}
            color="black"
          />
          <TextField
            keyboardAppearance="dark"
            keyboardType="email-address"
            containerStyle={{ width: 200 }}
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoComplete="email"
            collapsable={true}
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.yellow5,
              default: Colors.grey30,
            }}
            text65M
            fieldStyle={styles.withUnderline}
          />
        </View>
        <View style={tw("flex flex-row mt-4 items-end")}>
          <Entypo style={tw("mr-2")} name="lock" size={30} color="black" />
          <TextField
            keyboardType="visible-password"
            autoComplete="password"
            keyboardAppearance="dark"
            containerStyle={{ width: 200 }}
            placeholder="Enter password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.yellow5,
              default: Colors.grey30,
            }}
            text65M
            fieldStyle={styles.withUnderline}
          />
        </View>

        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={[
            tw(
              "flex flex-row items-center bg-gray-800 p-4 rounded-md w-40 justify-center mt-10 self-center"
            ),
            styles.boxShadow,
          ]}
        >
          <Text style={tw("text-2xl font-semibold text-white mr-2")}>
            Login
          </Text>
          <MaterialIcons name="login" size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

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
