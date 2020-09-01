// In AppNavigator.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ScreenOne from '../screens/screenOne';
import ScreenTwo from '../screens/screenTwo';
import ScreenThree from '../screens/screenThree';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="One">
        <Stack.Screen name="One" component={ScreenOne} />
        <Stack.Screen name="Two" component={ScreenTwo} />
        <Stack.Screen name="Three" component={ScreenThree} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
