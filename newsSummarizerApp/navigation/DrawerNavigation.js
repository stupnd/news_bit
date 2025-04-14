// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import NewsStack from './NewsStack';
import CustomHeaderTitle from '../components/CustomHeaderTitle';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fff', height: 110 }, // Increase height for more space
          headerTitleAlign: 'center',
          headerTintColor: '#233',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={NewsStack} 
          options={({ route, navigation }) => ({
            drawerLabel: 'All News',
            // Pass onPress to navigate to Home (which refreshes the NewsFeed)
            headerTitle: () => (
              <CustomHeaderTitle
                category={route.params?.category || 'All News'}
                onPress={() => navigation.navigate('Home')}
              />
            ),
          })}
          initialParams={{ category: 'All News' }}
        />
        <Drawer.Screen 
          name="Politics" 
          component={NewsStack} 
          options={({ route, navigation }) => ({
            drawerLabel: 'Politics',
            headerTitle: () => (
              <CustomHeaderTitle
                category={route.params?.category || 'Politics'}
                onPress={() => navigation.navigate('Home')}
              />
            ),
          })}
          initialParams={{ category: 'Politics' }}
        />
        <Drawer.Screen 
          name="Technology" 
          component={NewsStack} 
          options={({ route, navigation }) => ({
            drawerLabel: 'Technology',
            headerTitle: () => (
              <CustomHeaderTitle
                category={route.params?.category || 'Technology'}
                onPress={() => navigation.navigate('Home')}
              />
            ),
          })}
          initialParams={{ category: 'Technology' }}
        />
        <Drawer.Screen 
          name="Sports" 
          component={NewsStack} 
          options={({ route, navigation }) => ({
            drawerLabel: 'Sports',
            headerTitle: () => (
              <CustomHeaderTitle
                category={route.params?.category || 'Sports'}
                onPress={() => navigation.navigate('Home')}
              />
            ),
          })}
          initialParams={{ category: 'Sports' }}
        />
        <Drawer.Screen 
          name="Entertainment" 
          component={NewsStack} 
          options={({ route, navigation }) => ({
            drawerLabel: 'Entertainment',
            headerTitle: () => (
              <CustomHeaderTitle
                category={route.params?.category || 'Entertainment'}
                onPress={() => navigation.navigate('Home')}
              />
            ),
          })}
          initialParams={{ category: 'Entertainment' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
