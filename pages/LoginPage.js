import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  // State to store the username, password, and loading state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      // Set loading to true when starting the fetch
      setIsLoading(true);

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

        // Log the entire response for inspection
        console.log("API Response:", responseData);

        // Check if the token is present in the response
        if (responseData.access) {
          // Save the token to AsyncStorage
          await AsyncStorage.setItem("authToken", responseData.access);

          alert("Successfully Logged In");
          console.log("Login successful:", responseData);
          navigation.navigate("Home");
        } else {
          console.error("Token not present in the response");
          alert("Something is wrong", responseData);
        }
      } else {
        // Handle unsuccessful login (e.g., display an error message)
        const errorData = await response.json();
        console.error("Login error:", errorData);
        alert("Something is wrong", responseData);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Login error:", error.message);
      if (error.message.includes("CORS")) {
        console.error(
          "CORS issue detected. Check server-side CORS configuration."
        );
      }
    } finally {
      // Set loading back to false when the fetch is complete
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleName}>N&Z Logganisa Maker</Text>
        <Text style={styles.title}>Sign in</Text>

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

        {/* Login button with conditional text based on loading state */}
        <Button
          title={isLoading ? "Loading..." : "Log In"}
          onPress={handleLoginPress}
          color="purple"
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            textTransform: "none",
          }}
          disabled={isLoading} // Disable button when loading
        />
      </View>
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
  formContainer: {
    width: "95%",
    padding: 20,
    marginBottom: 50,
    paddingBottom: 30,
    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: "black", // Set border color to black
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // This is for Android shadow
    margin: "auto", // Center the container horizontally, if needed
  },
  titleName: {
    fontSize: 25,
    color: "#ba85e0",
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 15,
    textAlign: "center",
  },
  title: {
    fontSize: 17,
    marginBottom: 16,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    paddingRight: 8,
    width: "100%",
    borderRadius: 6,
    marginBottom: 20,
  },
});

export default LoginPage;
