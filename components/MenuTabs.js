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
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import CameraScreen from "../screens/CameraScreen";
import tw from "tailwind-rn";
import SplashScreen from "../screens/SplashScreen";
import ScanButton from "./ScanButton";
import { useSelector } from "react-redux";
import ResultsScreen from "../screens/ResultsScreen";
import PlaceGallery from "../screens/PlaceGallery";
import useLocation from "../hooks/useLocation";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const MenuTabs = () => {
  const { user } = useAuth();
  const [currentLocation] = useLocation();
  const { message } = useSelector((state) => state.appReducer);
  const { placeData } = useSelector((state) => state.placeReducer);
  // showing a login screen if user is not logged
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }
  if (message) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Gallery" component={PlaceGallery} />
      </Stack.Navigator>
    );
  }
  if (placeData) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Gallery" component={PlaceGallery} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    );
  }
  // showing home screen if user is logged in
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#B9D8C8",
          borderRadius: 15,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { top: 10, color: "#202120" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                style={{ top: 10 }}
                name="home-sharp"
                size={30}
                color="#202120"
              />
            ) : (
              <Ionicons
                style={{ top: 10 }}
                name="home-outline"
                size={30}
                color="white"
              />
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
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarLabelStyle: { top: 20, color: "white" },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-cog-outline"
              size={30}
              color="white"
              style={{ left: 2, top: 10 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MenuTabs;
