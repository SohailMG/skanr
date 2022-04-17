import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-rn";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import MenuTabs from "./navigation/MenuTabs";
import { AuthProvider } from "./hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { createContext, useEffect } from "react";
import useLocation from "./hooks/useLocation";
import Loading from "./components/loaders/Loading";
import { reverseGeocode } from "./modules/PlacesApi";
import { setUserLocation } from "./slices/appSlice";
/* 
Author : Sohail GSais 
Updated : 2022/01/04
*/
export default function App() {
  const location = useLocation();
  useEffect(() => {
    (() => {
      const [currentLocation] = location;

      if (currentLocation) {
        store.dispatch(setUserLocation(currentLocation));
      }
    })();
  }, [location]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          {/* Redux provider */}
          {/* HOC - Higher order component */}
          <AuthProvider>
            {location[0] ? (
              <MenuTabs />
            ) : (
              <Loading text={"Getting your current location"} />
            )}
            {/* Passes down the core auth to child components */}
          </AuthProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
