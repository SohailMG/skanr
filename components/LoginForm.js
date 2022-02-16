import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Colors, Button, Incubator } from "react-native-ui-lib";
import React, { useState, useEffect } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import GoogleSvg from "../assets/google.svg";

const LoginForm = () => {
  const { TextField } = Incubator;
  const { loginUser, error, loading, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={[
        tw("flex flex-col  p-4 self-center rounded-md"),
        { width: "90%" },
        ,
      ]}
    >
      <View style={tw("mt-4 mb-10")}>
        <View
          style={[
            tw("flex flex-row mt-4 items-end p-2 rounded-xl"),
            { backgroundColor: "#434E6E" },
          ]}
        >
          <MaterialIcons
            style={tw("mr-2")}
            name="email"
            size={30}
            color="gray"
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
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.white,
              default: Colors.grey30,
            }}
            text65M
            fieldStyle={styles.withUnderline}
          />
        </View>
        <View
          style={[
            tw("flex flex-row mt-4 items-end p-2 rounded-xl"),
            { backgroundColor: "#434E6E" },
          ]}
        >
          <Entypo style={tw("mr-2")} name="lock" size={30} color="gray" />
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

        <View style={[tw("flex flex-row"), { justifyContent: "space-around" }]}>
          <TouchableOpacity
            disabled={!email || !password}
            onPress={() => loginUser(email, password)}
            style={[
              tw(
                `flex flex-row items-center ${
                  !email || !password ? "border border-gray-500" : "bg-gray-200"
                } p-4 rounded-xl w-40 justify-center mt-10 self-center`
              ),
              styles.boxShadow,
            ]}
          >
            <Text style={tw("text-2xl font-semibold text-gray-600 mr-2")}>
              Login
            </Text>
            {loading ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <MaterialIcons name="login" size={30} color="gray" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => loginUser(email, password)}
            style={[
              tw(
                "flex flex-row items-center bg-gray-200 p-4 rounded-xl w-40 justify-center mt-10 self-center"
              ),
              styles.boxShadow,
            ]}
          >
            <Text style={tw("text-2xl font-semibold text-gray-600 mr-2")}>
              Register
            </Text>
            {loading ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <MaterialIcons name="login" size={30} color="gray" />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={[
            tw("justify-center self-center mt-4"),
            { alignItems: "center" },
          ]}
        >
          <Text style={tw("text-gray-200 font-semibold text-xl")}>Or</Text>
          <Text style={tw("text-white text-lg")}>Continue with Google</Text>
          <TouchableOpacity
            onPress={signInWithGoogle}
            style={[
              tw("w-10 mt-2 h-10 rounded-full bg-white"),
              styles.boxShadow,
            ]}
          >
            <GoogleSvg />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {},
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
