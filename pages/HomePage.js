import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AppNavbar from "../components/AppNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage = ({ navigation }) => {
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    // Fetch flavors when the component mounts
    fetchFlavors();
  }, []);

  const apiUrl = "https://api-longga-weznbalgna-as.a.run.app/flavors/";

  // const makeFood = `https://api-longga-weznbalgna-as.a.run.app/flavors/${title}`;

  const fetchFlavors = async () => {
    try {
      // Retrieve the stored token from AsyncStorage
      const authToken = await AsyncStorage.getItem("authToken");

      // Perform the API GET request with the token in the headers
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Update the flavors state with the fetched data
        setFlavors(data);
      } else {
        // Handle unsuccessful response
        console.error("Error fetching flavors:", response.status);
      }
    } catch (error) {
      console.error("Error fetching flavors:", error);
    }
  };

  const handleProcess = async (e) => {
    e.preventDefault();
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(makeFood, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Do something with the fetched data, for example, update state
        console.log(data);
      } else {
        // Handle the case where the response status is not OK
        console.log("Response not okay:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other exceptions
    }
  };

  // Function to navigate to the TextInput page
  const goToTextInputPage = () => {
    navigation.navigate("TextInput");
  };

  console.log(flavors);

  return (
    <>
      <AppNavbar navigation={navigation} />
      <View style={styles.container}>
        {/* Logo (replace 'your-logo-path' with the actual path to your logo) */}
        <Image
          source={{
            uri: "https://cdn.discordapp.com/attachments/1158629581352345650/1188004468277653534/Logo_LMM.png?ex=6598f261&is=65867d61&hm=ac20881ce0b52873143cfa433e3812f4992e26a4b351c55fa353aa81412057de&",
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
          {flavors &&
            flavors.map((flavor, index) => (
              <Button key={index} title={flavor.title} color="purple" />
            ))}
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
    width: "65%", // Full width
    height: "35%", // Adjust height as needed
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
