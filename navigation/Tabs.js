import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import AccountScreen from "../screens/AccountScreen";
import ScanButton from "../components/ScanButton";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme } = useSelector((state) => state.themeReducer);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.fontColor,
        headerShown: false,
        tabBarActiveBackgroundColor: "transparent",
        tabBarStyle: { backgroundColor: theme.foreground, ...styles.tabStyle },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarButton: (props) => <ScanButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabStyle: {
    height: 70,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    width: "90%",
    marginHorizontal: "5%",
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
});
