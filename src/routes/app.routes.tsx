import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

//const { Navigator, Screen } = createStackNavigator();
const Stack = createStackNavigator();

export function AppRoute() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.secondary100 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
      <Stack.Screen
        name="AppointmentCreate"
        component={AppointmentCreate}
      />
    </Stack.Navigator >
  );
}
