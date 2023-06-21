import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./config";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { Image, StyleSheet } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: "Login",
                headerTitleAlign: "center",
                headerStyle: styles.header,
                headerTintColor: "#FFFFFF",
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerTitle: "Register",
                headerTitleAlign: "center",
                headerStyle: styles.header,
                headerTintColor: "#FFFFFF",
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: () => (
                <Image
                  source={require("./assets/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              ),
              headerTitleAlign: "center",
              headerStyle: styles.header,
              headerTintColor: "#FFFFFF",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4287f5",
  },
  logo: {
    width: 150,
    height: 30,
  },
});

export default App;
