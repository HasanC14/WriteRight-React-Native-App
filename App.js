import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./config";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";

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

    return subscriber; // Clean up the subscription
  }, []);

  if (initializing) {
    return null; // Render loading state if still initializing
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: "Register" }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: "WriteRight" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
