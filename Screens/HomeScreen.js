import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ShoppingItem from "../components/ShoppingItem";
import AddItemForm from "../components/AddItemForm";

const HomeScreen = () => {
  const shoppingList = useSelector((state) => state.shoppingList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <AddItemForm />
      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ShoppingItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
