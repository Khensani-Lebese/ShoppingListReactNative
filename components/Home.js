import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AddItemForm from "./AddItemForm";
import ShoppingItem from "./ShoppingItem";

const Home = ({ navigation }) => {
  const { currentUser, products } = useSelector((state) => state); // Redux state
  const dispatch = useDispatch();

  console.log("Current User:", currentUser); // Debug currentUser state
  console.log("Products:", products); // Debug products state

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" }); // Logout action
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {currentUser ? (
        <View>
          <Text style={styles.welcomeText}>
            Welcome, {currentUser.name || "User"} {/* Fallback for name */}
          </Text>
          <AddItemForm />
          <View>
            {products.length > 0 && products ? (
              products.map((item) => <ShoppingItem key={item.id} item={item} />)
            ) : (
              <Text>No products found.</Text>
            )}
          </View>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Text>Please log in.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  welcomeText: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
});

export default Home;
