import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "../hooks/useAuth";
import AccountScreen from "../screens/AccountScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CameraScreen from "../screens/CameraScreen";
import PlaceGallery from "../screens/PlaceGallery";
import { useSelector } from "react-redux";
import ModalScreen from "../screens/ModalScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import Tabs from "./Tabs";
import HeroScreen from "../screens/HeroScreen";
const Stack = createNativeStackNavigator();

const MenuTabs = () => {
  const { user } = useAuth();
  const { scanActive } = useSelector((state) => state.appReducer);
  // showing a login screen if user is not logged
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Hero" component={HeroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
  if (scanActive) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Gallery" component={PlaceGallery} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
      </Stack.Navigator>
    );
  }
  return <Tabs />;
};
export default MenuTabs;

const styles = StyleSheet.create({
  tabStyle: {
    height: 70,
    borderRadius: 50,
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
