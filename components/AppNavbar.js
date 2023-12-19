// AppNavbar.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AppNavbar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("TextInput")}
      >
        <Text style={styles.navButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3498db",
    height: 50,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppNavbar;
