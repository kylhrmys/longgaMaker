import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  AppRegistry,
} from "react-native";
import AppNavbar from "../components/AppNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextInputPage = ({ navigation }) => {
  const [flavorInputs, setFlavorInputs] = useState({
    name: "",
    ingredient1: 0,
    ingredient2: 0,
    ingredient3: 0,
    ingredient4: 0,
    ingredient5: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFlavorInputs((prev) => ({ ...prev, [name]: value }));
  };

  const apiUrl = "https://api-longga-weznbalgna-as.a.run.app/flavors/create";

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const authToken = await AsyncStorage.getItem("authToken");

      // Prepare the data to be sent in the request body
      const formData = new FormData();
      formData.append("title", flavorInputs.name);
      formData.append("amount1", flavorInputs.ingredient1.toString());
      formData.append("amount2", flavorInputs.ingredient2.toString());
      formData.append("amount3", flavorInputs.ingredient3.toString());
      formData.append("amount4", flavorInputs.ingredient4.toString());
      formData.append("amount5", flavorInputs.ingredient5.toString());

      // Perform the API POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      // Check the response status
      if (response.ok) {
        // Request was successful
        alert("Flavor created!");
        setFlavorInputs({
          name: "",
          ingredient1: 0,
          ingredient2: 0,
          ingredient3: 0,
          ingredient4: 0,
          ingredient5: 0,
        });
      } else {
        console.log("error:", response);
        alert("Failed to create Flavor. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error creating Flavor:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFlavorInputs({
      name: "",
      ingredient1: 0,
      ingredient2: 0,
      ingredient3: 0,
      ingredient4: 0,
      ingredient5: 0,
    });
  };

  return (
    <>
      <AppNavbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Craft Your Signature Longganisa</Text>
          <Text style={styles.subtitle}>
            Unleash your culinary creativity with our "Create Your Own Flavor"
            feature. Design a longganisa that reflects your unique taste
            preferences, and savor the satisfaction of enjoying a truly
            personalized culinary masterpiece.
          </Text>

          {/* Flavor Name input */}
          <TextInput
            style={styles.input}
            placeholder="Flavor Name"
            onChangeText={(text) => handleInputChange("name", text)}
            value={flavorInputs.name}
          />

          {/* Amount inputs (up to 5) */}
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <Text style={styles.label}>{`Ingredient ${
                index + 1
              } Amount:`}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter amount for Ingredient ${index + 1}`}
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleInputChange(
                    `ingredient${index + 1}`,
                    parseInt(text, 10)
                  )
                }
                value={flavorInputs[`ingredient${index + 1}`].toString()}
              />
            </React.Fragment>
          ))}

          {/* Buttons in a row */}
          <View style={styles.buttonContainer}>
            <Button title="Clear" onPress={handleClear} color="purple" />
            <View style={styles.buttonSpacer} />
            <Button
              title={loading ? "Loading..." : "Create"}
              onPress={handleSubmit}
              color="purple"
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  container: {
    width: "80%", // Adjust width as needed
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    color: "purple",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    paddingRight: 8,
    width: "100%", // Adjust width as needed
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonSpacer: {
    width: 16, // Adjust the width as needed
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    width: "100%", // Adjust width as needed
  },
});

export default TextInputPage;
