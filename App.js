// Import necessary components and libraries
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your three pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TextInputPage from "./pages/TextInputPage";

// Create a stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Define the three screens with their respective components */}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="TextInput" component={TextInputPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
