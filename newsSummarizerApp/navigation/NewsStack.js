import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsFeed from '../screens/NewsFeed';
import ArticleDetail from '../screens/ArticleDetail';

const Stack = createStackNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // This hides the header in the stack navigator
      }}
    >
      <Stack.Screen 
        name="NewsFeed" 
        component={NewsFeed}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{
          headerShown: true,
          headerTitle: 'Article Details',
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsStack;