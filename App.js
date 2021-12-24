import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-rn";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); // Ignore log notification by message
import MenuTabs from "./components/MenuTabs";
import { AuthProvider } from "./hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/* HOC - Higher order component */}
        {/* <KeyboardAvoidingView> */}
          <AuthProvider>
            {/* Passes down the core auth to child components */}
            <MenuTabs />
          </AuthProvider>
        {/* </KeyboardAvoidingView> */}
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
