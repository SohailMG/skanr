import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-rn";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import MenuTabs from "./components/MenuTabs";
import { AuthProvider } from "./hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { createContext } from "react";
/* 
Author : Sohail GSais 
Updated : 2022/01/04
*/
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/* Redux provider */}
        <Provider store={store}>
          {/* HOC - Higher order component */}
          <AuthProvider>
            {/* Passes down the core auth to child components */}
            <MenuTabs />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
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
