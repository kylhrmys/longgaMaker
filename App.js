// Main component (e.g., App.js)

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavbar from "./components/AppNavbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TextInputPage from "./pages/TextInputPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="TextInput" component={TextInputPage} />
      </Stack.Navigator>

      {/* Render the AppNavbar component and pass the navigation prop */}
    </NavigationContainer>
  );
};

export default App;
