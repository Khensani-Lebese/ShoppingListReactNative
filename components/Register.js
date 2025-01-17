import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js"; // Import crypto-js for encryption

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  // Secret key for encryption (use environment variables for production)
  const SECRET_KEY = "3855fus3jdkbjdfhuheijfienhdiuf";

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      // Encrypt the password
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        SECRET_KEY
      ).toString();

      // Save user details to AsyncStorage
      const user = { email, password: encryptedPassword, name };
      await AsyncStorage.setItem(email, JSON.stringify(user));

      // Dispatch Redux action
      dispatch({ type: "REGISTER_USER", payload: { email, name } });

      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to register user. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { borderWidth: 1, padding: 10, margin: 10, width: "80%" },
});

export default Register;
