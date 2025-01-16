import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions";

const AddItemForm = () => {
  const [itemName, setItemName] = useState("");
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (itemName.trim()) {
      const newItem = {
        id: Date.now(),
        name: itemName,
        purchased: false,
      };
      dispatch(addItem(newItem));
      setItemName("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add Item"
        value={itemName}
        onChangeText={setItemName}
      />
      <Button title="Add" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 20 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10 },
});

export default AddItemForm;
