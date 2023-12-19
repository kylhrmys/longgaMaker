import React from "react";
import { View, Text, Button } from "react-native";

const HomePage = ({ navigation }) => {
  // Function to navigate to the TextInput page
  const goToTextInputPage = () => {
    navigation.navigate("TextInput");
  };

  return (
    <View>
      <Text>Home Page</Text>
      {/* Your home page UI components go here */}
      <Button title="Go to Text Input Page" onPress={goToTextInputPage} />
    </View>
  );
};

export default HomePage;
