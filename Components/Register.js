import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { firebase, firestore } from "../config";

import "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Additional logic, if needed

        // Save user information to the database
        saveUserToDatabase(user);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        ToastAndroid.show("Registration failed", ToastAndroid.SHORT);
        // Handle error
      });
  };

  const saveUserToDatabase = (user) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        email: user.email,
        username: username,
      })
      .then(() => {
        ToastAndroid.show("Registration successful", ToastAndroid.SHORT);
        // Additional logic, if needed
      })
      .catch((error) => {
        console.error("Saving user failed:", error);
        ToastAndroid.show("Registration failed", ToastAndroid.SHORT);
        // Handle error
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
});

export default Register;
