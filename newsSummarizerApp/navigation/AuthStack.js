// navigation/AuthStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
// Optionally, import RegisterScreen if you create one.
// import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for authentication screens
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/*
      <Stack.Screen name="Register" component={RegisterScreen} />
      */}
    </Stack.Navigator>
  );
};

export default AuthStack;
