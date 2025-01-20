import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addItem } from "../redux/actions";

const AddItemForm = () => {
  const [productName, setProductName] = useState("");
  const dispatch = useDispatch();
  const { currentUser, products } = useSelector((state) => state);

  const handleAddProduct = async () => {
    if (!productName.trim()) {
      Alert.alert("Error", "Product name cannot be empty!");
      return;
    }

    const newProduct = { id: Date.now().toString(), name: productName };

    // Update Redux store
    dispatch(addItem(newProduct));

    // Save to AsyncStorage
    const updatedProducts = [...products, newProduct];
    await AsyncStorage.setItem(
      `${currentUser.email}_products`,
      JSON.stringify(updatedProducts)
    );

    setProductName("");
    Alert.alert("Success", "Product added!");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={productName}
        onChangeText={setProductName}
      />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
});

export default AddItemForm;
