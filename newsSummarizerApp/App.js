// App.js
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './navigation/AuthStack';
import DrawerNavigator from './navigation/DrawerNavigator';
import { firebase } from './firebaseConfig';  // Make sure the path is correct
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [user, setUser] = useState(null);  // Will hold the Firebase user object
  const [loading, setLoading] = useState(true); // Determines if the auth state is loading

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  if (loading) {
    // While we determine the auth state, show a simple loading screen.
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
