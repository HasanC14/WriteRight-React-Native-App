import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { firebase } from "../config";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
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
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
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
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} disabled={loading} />
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.registerContainer}>
            <Text>Don't have an account?</Text>
            <Text style={styles.registerLink} onPress={navigateToRegister}>
              Register here.
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
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
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});

export default Login;
