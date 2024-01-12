import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Switch, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavbar from "../components/AppNavbar";

const Production = ({ navigation }) => {
  const [isGrinder, setIsGrinder] = useState("OFF");
  const [isMixer, setIsMixer] = useState("OFF");
  const [isTieing, setIsTieing] = useState("OFF");
  const [inProgress, setInProgress] = useState(false);
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    // Fetch flavors when the component mounts
    fetchFlavors();
  }, []);

  const apiUrl = "https://api-longga-weznbalgna-as.a.run.app/flavors/";
  const grinderUrl = "https://api-longga-weznbalgna-as.a.run.app/grinder";
  const mixerUrl = "https://api-longga-weznbalgna-as.a.run.app/mixer";
  const tieingUrl = "https://api-longga-weznbalgna-as.a.run.app/tie";
  const dispenseUrl = "https://api-longga-weznbalgna-as.a.run.app/dispense";

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

  const handleGrinder = async () => {
    const newIsGrinder = !isGrinder;
    setIsGrinder(newIsGrinder);
    const authToken = await AsyncStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("action", newIsGrinder ? "ON" : "OFF");

    try {
      const response = await fetch(grinderUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data", // Update this line
        },
        body: formData,
      });

      if (response.status === 200) {
        Alert.alert("Grinder is now running");
      } else {
        setIsGrinder(!newIsGrinder);
        Alert.alert("Please connect to hardware locally.");
        console.log("error:", response);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleMixer = async () => {
    const newIsMixer = !isMixer;
    setIsMixer(newIsMixer);

    const authToken = await AsyncStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("action", newIsMixer ? "ON" : "OFF");

    try {
      const response = await fetch(mixerUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.status === 200) {
        Alert.alert("Mixer is now running");
      } else {
        setIsMixer(!newIsMixer);
        Alert.alert("Please connect to hardware locally.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  };

  const handleTieing = async () => {
    const newIsTieing = !isTieing;
    setIsTieing(newIsTieing);

    const authToken = await AsyncStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("action", newIsTieing ? "ON" : "OFF");

    try {
      const response = await fetch(tieingUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.status === 200) {
        Alert.alert("Tieing machine is now running");
      } else {
        setIsTieing(!newIsTieing);
        Alert.alert("Please connect to hardware locally.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  };

  const handleFlavorClick = async (flavor) => {
    setInProgress(true);
    const authToken = await AsyncStorage.getItem("authToken");

    if (!flavor || !flavor.title) {
      // Handle the case where flavor or flavor.title is undefined
      setInProgress(false);
      console.error("Invalid flavor object:", flavor);
      return;
    }

    const name = flavor.title;
    const formData = new FormData();

    formData.append("flavor", name);

    try {
      const response = await fetch(dispenseUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Flavor dispensed successfully", [
          { text: "OK" },
        ]);
      } else {
        Alert.alert("Error", "Please connect to hardware locally.", [
          { text: "OK" },
        ]);
        console.log("error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
      Alert.alert("Error", "An error occurred. Please try again later.", [
        { text: "OK" },
      ]);
    } finally {
      setInProgress(false);
    }
  };

  return (
    <>
      <AppNavbar navigation={navigation} />
      <View style={styles.container}>
        {/* Toggle Switch 1 */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Grinder</Text>
          <Switch onValueChange={handleGrinder} value={isGrinder} />
        </View>

        {/* Toggle Switch 2 */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Mixer</Text>
          <Switch onValueChange={handleMixer} value={isMixer} />
        </View>

        {/* Toggle Switch 3 */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Tie-ing</Text>
          <Switch onValueChange={handleTieing} value={isTieing} />
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Flavors</Text>
          {flavors &&
            flavors.map((flavor, index) => (
              <Button
                key={index}
                title={inProgress ? "In Progress" : flavor.title}
                color="purple"
                onPress={() => handleFlavorClick(flavor)}
                disabled={inProgress}
              />
            ))}
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
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
  },
});

export default Production;
