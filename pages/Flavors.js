import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavbar from "../components/AppNavbar";

const YourComponent = ({ navigation }) => {
  const [flavors, setFlavors] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [editedAmount1, setEditedAmount1] = useState("");
  const [editedAmount2, setEditedAmount2] = useState("");
  const [editedAmount3, setEditedAmount3] = useState("");
  const [editedAmount4, setEditedAmount4] = useState("");
  const [editedAmount5, setEditedAmount5] = useState("");

  const apiUrl = "https://api-longga-weznbalgna-as.a.run.app/flavors/";

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

  useEffect(() => {
    // Call the fetchFlavors function
    fetchFlavors();
  }, []); // Ensure to include an empty dependency array to run the effect only once

  const handleEdit = (item) => {
    // Set the selected flavor and open the edit modal
    setSelectedFlavor(item);
    setEditModalVisible(true);
  };

  const handleDelete = (itemId) => {
    // Implement your delete logic here
    console.log("Delete item with ID:", itemId);
  };

  const handleEditConfirm = () => {
    // Implement your edit logic here using selectedFlavor and editedAmounts
    console.log(
      "Edit confirmed for item:",
      selectedFlavor,
      "with new amounts:",
      editedAmount1,
      editedAmount2,
      editedAmount3,
      editedAmount4,
      editedAmount5
    );

    // Close the modal after editing
    setEditModalVisible(false);
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Title</Text>
      <Button title="Add" color="purple" />
    </View>
  );

  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableRowText}>{item.title}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <AppNavbar navigation={navigation} />
      <View>
        {/* Render your table header */}
        {renderTableHeader()}

        {/* Render the table */}
        <FlatList
          data={flavors}
          keyExtractor={(item) => (item.id ? item.id.toString() : "")}
          renderItem={renderTableRow}
        />

        {/* Edit Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Edit Flavor: {selectedFlavor?.title}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter edited amount 1"
                keyboardType="numeric"
                value={editedAmount1}
                onChangeText={(text) => setEditedAmount1(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter edited amount 2"
                keyboardType="numeric"
                value={editedAmount2}
                onChangeText={(text) => setEditedAmount2(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter edited amount 3"
                keyboardType="numeric"
                value={editedAmount3}
                onChangeText={(text) => setEditedAmount3(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter edited amount 4"
                keyboardType="numeric"
                value={editedAmount4}
                onChangeText={(text) => setEditedAmount4(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter edited amount 5"
                keyboardType="numeric"
                value={editedAmount5}
                onChangeText={(text) => setEditedAmount5(text)}
              />
              <View style={styles.buttons}>
                <Button title="Confirm" onPress={handleEditConfirm} />
                <Button
                  title="Cancel"
                  onPress={() => setEditModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    fontWeight: "bold",
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  tableRowText: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: "row",
  },
  editButton: {
    color: "blue",
    marginRight: 10,
  },
  deleteButton: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 5,
  },
  buttons: {
    gap: 20,
  },
});

export default YourComponent;
