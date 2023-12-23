import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AppNavbar from "../components/AppNavbar";

const HomePage = ({ navigation }) => {
  const [flavors, setFlavors] = useState([]);

  // useEffect(() => {
  //   // Fetch flavors when the component mounts
  //   fetchFlavors();
  // }, []);

  // const fetchFlavors = async () => {
  //   try {
  //     // Perform the API GET request
  //     const response = await fetch("your-api-endpoint/flavors");
  //     const data = await response.json();

  //     // Update the flavors state with the fetched data
  //     setFlavors(data);
  //   } catch (error) {
  //     console.error("Error fetching flavors:", error);
  //   }
  // };

  // Function to navigate to the TextInput page
  const goToTextInputPage = () => {
    navigation.navigate("TextInput");
  };

  return (
    <>
      <AppNavbar navigation={navigation} />
      <View style={styles.container}>
        {/* Logo (replace 'your-logo-path' with the actual path to your logo) */}
        <Image
          source={{
            uri: "https://cdn.discordapp.com/attachments/1186303035421499462/1186626024264437791/Z.png?ex=6593ee9a&is=6581799a&hm=857423033d2af2cc5901f81dcba8db4e7535fd79623151e6c7b2672757798f09&",
          }}
          style={styles.logo}
        />

        {/* Text Header */}
        <Text style={styles.header}>Flavors you can make</Text>

        {/* Text Sub-header/Description */}
        <Text style={styles.subheader}>
          Discover the delightful flavors of our premium longganisa. Choose from
          our signature recipes or create your own custom flavor.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Flavor" color="purple" />
          <Button
            title="Custom Flavor"
            onPress={goToTextInputPage}
            color="purple"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: "90%", // Full width
    height: "40%", // Adjust height as needed
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "50%", // Full width
    gap: 15,
  },
});

export default HomePage;
