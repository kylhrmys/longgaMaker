import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import CookieManager from "@react-native-cookies/cookies";

const LoginPage = ({ navigation }) => {
  // State to store the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle username input changes
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  // Function to handle password input changes
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  // Function to handle login button press
  const handleLoginPress = async () => {
    const apiUrl = "https://api-longga-weznbalgna-as.a.run.app/auth/login/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Successful login
        const responseData = await response.json();
        alert("Successfully Logged In");
        console.log("Login successful:", responseData);

        // Store cookies here if needed
        await CookieManager.setFromResponse(apiUrl, response);

        navigation.navigate("Home");
      } else {
        // Handle unsuccessful login (e.g., display an error message)
        const errorData = await response.json();
        console.error("Login error:", errorData);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Login error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      {/* Username input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry // For password input
      />

      {/* Login button */}
      <Button
        title="Log In"
        onPress={handleLoginPress}
        color="purple"
        style={{
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    color: "purple",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    paddingRight: 8,
    width: "80%",
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default LoginPage;
