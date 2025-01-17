import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const { currentUser, products } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log("Current User:", currentUser); // Debug currentUser state

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
    navigation.navigate("Login");
  };

  return (
    <View>
      {currentUser ? (
        <View>
          <Text>Welcome, {currentUser.name || "User"}</Text>{" "}
          {/* Fallback for name */}
          {products.length > 0 ? (
            products.map((product) => (
              <Text key={product.id}>{product.name}</Text>
            ))
          ) : (
            <Text>No products found.</Text>
          )}
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Text>Please log in.</Text>
      )}
    </View>
  );
};

export default Home;
