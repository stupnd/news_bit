// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import NewsStack from './NewsStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#333',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={NewsStack} 
          options={{ title: 'All News' }} 
          initialParams={{ category: 'All News' }} 
        />
        <Drawer.Screen 
          name="Politics" 
          component={NewsStack} 
          options={{ title: 'Politics' }} 
          initialParams={{ category: 'Politics' }} 
        />
        <Drawer.Screen 
          name="Technology" 
          component={NewsStack} 
          options={{ title: 'Technology' }} 
          initialParams={{ category: 'Technology' }} 
        />
        <Drawer.Screen 
          name="Sports" 
          component={NewsStack} 
          options={{ title: 'Sports' }} 
          initialParams={{ category: 'Sports' }} 
        />
        <Drawer.Screen 
          name="Entertainment" 
          component={NewsStack} 
          options={{ title: 'Entertainment' }} 
          initialParams={{ category: 'Entertainment' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
