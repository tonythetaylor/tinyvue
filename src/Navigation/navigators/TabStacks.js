import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tabs from './Tabs';
import { Profile } from 'Screens';

const Stack = createNativeStackNavigator();

const TabStacks = ({ params }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

export default TabStacks;
