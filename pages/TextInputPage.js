import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppNavbar from "../components/AppNavbar";

const TextInputPage = ({ navigation }) => {
  const [longganisaName, setLongganisaName] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [ingredient3, setIngredient3] = useState("");
  const [ingredient4, setIngredient4] = useState("");
  const [ingredient5, setIngredient5] = useState("");

  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [amount3, setAmount3] = useState("");
  const [amount4, setAmount4] = useState("");
  const [amount5, setAmount5] = useState("");

  const handleLongganisaNameChange = (text) => {
    setLongganisaName(text);
  };

  const handleIngredient1Change = (text) => {
    setIngredient1(text);
  };

  const handleIngredient2Change = (text) => {
    setIngredient2(text);
  };

  const handleIngredient3Change = (text) => {
    setIngredient3(text);
  };

  const handleIngredient4Change = (text) => {
    setIngredient4(text);
  };

  const handleIngredient5Change = (text) => {
    setIngredient5(text);
  };

  const handleAmount1Change = (text) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    // Convert the remaining text to an integer
    const intValue = numericText === "" ? "" : parseInt(numericText, 10);

    // Update the state with the integer value
    setAmount1(intValue);
  };

  const handleAmount2Change = (text) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    // Convert the remaining text to an integer
    const intValue = numericText === "" ? "" : parseInt(numericText, 10);

    // Update the state with the integer value
    setAmount2(intValue);
  };

  const handleAmount3Change = (text) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    // Convert the remaining text to an integer
    const intValue = numericText === "" ? "" : parseInt(numericText, 10);

    // Update the state with the integer value
    setAmount3(intValue);
  };

  const handleAmount4Change = (text) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    // Convert the remaining text to an integer
    const intValue = numericText === "" ? "" : parseInt(numericText, 10);

    // Update the state with the integer value
    setAmount4(intValue);
  };

  const handleAmount5Change = (text) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    // Convert the remaining text to an integer
    const intValue = numericText === "" ? "" : parseInt(numericText, 10);

    // Update the state with the integer value
    setAmount5(intValue);
  };

  const handleCreatePress = async () => {
    try {
      // Prepare the data to be sent in the request body
      const formData = {
        longganisaName,
        ingredients: [
          ingredient1,
          ingredient2,
          ingredient3,
          ingredient4,
          ingredient5,
        ],
        amounts: [amount1, amount2, amount3, amount4, amount5],
      };

      // Perform the API POST request
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(formData),
      });

      // Check the response status
      if (response.ok) {
        // Request was successful
        alert("Longganisa created!");
      } else {
        // Request failed
        alert("Failed to create Longganisa. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error creating Longganisa:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleTestPress = async () => {
    try {
      // Prepare the data to be sent in the request body
      const formData = {
        longganisaName,
        ingredients: [
          ingredient1,
          ingredient2,
          ingredient3,
          ingredient4,
          ingredient5,
        ],
        amounts: [amount1, amount2, amount3, amount4, amount5],
      };

      // Perform the API POST request
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(formData),
      });

      // Check the response status
      if (response.ok) {
        // Request was successful
        alert("Longganisa created!");
      } else {
        // Request failed
        alert("Failed to create Longganisa. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error creating Longganisa:", error);
      alert("An error occurred. Please try again.");
    }
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
          {/* Longganisa Name input */}
          <TextInput
            style={styles.input}
            placeholder="Longganisa Name"
            onChangeText={handleLongganisaNameChange}
            value={longganisaName}
          />

          {/* Ingredient inputs (up to 5) */}
          <TextInput
            style={styles.input}
            placeholder="Ingredient 1"
            onChangeText={handleIngredient1Change}
            value={ingredient1}
          />
          <TextInput
            style={styles.input}
            placeholder="Ammount of Ingredient 1 in grams"
            keyboardType="numeric"
            onChangeText={(text) => handleAmount1Change(parseInt(text, 10))}
            value={amount1.toString()} // Convert the integer back to a string for the TextInput
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredient 2"
            onChangeText={handleIngredient2Change}
            value={ingredient2}
          />
          <TextInput
            style={styles.input}
            placeholder="Ammount of Ingredient 2 in grams"
            keyboardType="numeric"
            onChangeText={(text) => handleAmount2Change(parseInt(text, 10))}
            value={amount2.toString()} // Convert the integer back to a string for the TextInput
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredient 3"
            onChangeText={handleIngredient3Change}
            value={ingredient3}
          />
          <TextInput
            style={styles.input}
            placeholder="Ammount of Ingredient 3 in grams"
            keyboardType="numeric"
            onChangeText={(text) => handleAmount3Change(parseInt(text, 10))}
            value={amount3.toString()} // Convert the integer back to a string for the TextInput
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredient 4"
            onChangeText={handleIngredient4Change}
            value={ingredient4}
          />
          <TextInput
            style={styles.input}
            placeholder="Ammount of Ingredient 4 in grams"
            keyboardType="numeric"
            onChangeText={(text) => handleAmount4Change(parseInt(text, 10))}
            value={amount4.toString()} // Convert the integer back to a string for the TextInput
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredient 5"
            onChangeText={handleIngredient5Change}
            value={ingredient5}
          />
          <TextInput
            style={styles.input}
            placeholder="Ammount of Ingredient 5 in grams"
            keyboardType="numeric"
            onChangeText={(text) => handleAmount5Change(parseInt(text, 10))}
            value={amount5.toString()} // Convert the integer back to a string for the TextInput
          />

          {/* Buttons in a row */}
          <View style={styles.buttonContainer}>
            <Button title="Create" onPress={handleCreatePress} color="purple" />
            <View style={styles.buttonSpacer} />
            <Button title="Test" onPress={handleTestPress} color="purple" />
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
