import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js"; // For decryption
import { loadUserProducts } from "../redux/actions";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const SECRET_KEY = "3855fus3jdkbjdfhuheijfienhdiuf"; // Same key used for encryption

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(email);
      if (!userData) {
        Alert.alert("Error", "User not found!");
        return;
      }

      const { password: encryptedPassword, name } = JSON.parse(userData);
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (password !== decryptedPassword) {
        Alert.alert("Error", "Incorrect password!");
        return;
      }

      // Fetch user's products from AsyncStorage
      const userProducts = await AsyncStorage.getItem(`${email}_products`);
      const products = userProducts ? JSON.parse(userProducts) : [];

      // Dispatch user and products to Redux
      dispatch({ type: "LOGIN_USER", payload: { email, name } });
      dispatch({ type: "SET_PRODUCTS", payload: products });

      Alert.alert("Success", "Login successful!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to log in. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { borderWidth: 1, padding: 10, margin: 10, width: "80%" },
});

export default Login;
