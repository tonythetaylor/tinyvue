import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Profile, Onboarding, Player, Library } from 'Screens';

const Stack = createNativeStackNavigator();

const Stacks = ({ params }) => (
  <Stack.Navigator initialRouteName="Onboarding"
  screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Home"
      component={Home}
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
    <Stack.Screen
      name="Onboarding"
      component={Onboarding}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Player"
      component={Player}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Library"
      component={Library}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default Stacks;
