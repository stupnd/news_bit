// navigation/NewsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsFeed from '../screens/NewsFeed';
import ArticleDetail from '../screens/ArticleDetail';

const Stack = createStackNavigator();

const NewsStack = ({ route }) => {
  // The initial params (such as category) are passed from the drawer.
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NewsFeed" 
        component={NewsFeed} 
        initialParams={route.params} 
        options={{ headerShown: false }} // Our NewsFeed already includes a header title.
      />
      <Stack.Screen 
        name="ArticleDetail" 
        component={ArticleDetail} 
        options={{ title: 'Article Detail' }} 
      />
    </Stack.Navigator>
  );
};

export default NewsStack;
