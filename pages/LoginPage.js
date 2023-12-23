import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

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
        const responseData = await response.json();

        // Store cookies (access and user) in AsyncStorage
        await AsyncStorage.setItem("access", responseData.access);
        await AsyncStorage.setItem("user", responseData.user);
        alert("Successfully Logged In");
        console.log("Login successful:", responseData);
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />

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
