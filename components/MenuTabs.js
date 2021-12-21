import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import AccountScreen from "../screens/AccountScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ResultsScreen from "../screens/ResultsScreen";


const Tab = createBottomTabNavigator();
const Stack= createNativeStackNavigator();
const MenuTabs = () => {
  const user = false;
  // showing a login screen if user is not logged
  if(!user){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    )
  }
  // showing home screen if user is logged in
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Favorites" component={FavouritesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
export default MenuTabs;
