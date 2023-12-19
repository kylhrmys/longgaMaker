import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const TextInputPage = () => {
  // State to store the text input value
  const [inputValue, setInputValue] = useState("");

  // Function to handle text input changes
  const handleInputChange = (text) => {
    setInputValue(text);
  };

  // Function to handle button press
  const handleButtonPress = () => {
    // Do something with the input value, e.g., display an alert
    alert(`Input Value: ${inputValue}`);
  };

  return (
    <View>
      <Text>Text Input Page</Text>
      {/* Text input field */}
      <TextInput
        placeholder="Enter text..."
        onChangeText={handleInputChange}
        value={inputValue}
      />
      {/* Button to perform an action with the input value */}
      <Button title="Press Me" onPress={handleButtonPress} />
    </View>
  );
};

export default TextInputPage;
