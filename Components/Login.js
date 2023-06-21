import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import { firebase } from "../config";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      });
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/login.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text>Don't have an account?</Text>
      <Text style={styles.registerLink} onPress={navigateToRegister}>
        Register here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  registerLink: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
