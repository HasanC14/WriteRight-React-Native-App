import { NavigationContainer } from "@react-navigation/native";
import { Header, createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { Stack } from "@react-navigation/stack";
import { firebase } from "./config";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
const App = () => {
  const [Initializing, setInitializing] = useState(true);
  const [User, setUser] = useState();

  function onAuthStateChanged(User) {
    setUser(User);
    if (Initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (Initializing) {
    return null;
  }

  if (!User) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitle: () => <Header name="Login"></Header> }}
        ></Stack.Screen>

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitle: () => <Header name="Register"></Header> }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: () => <Header name="WriteRight"></Header> }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
);
