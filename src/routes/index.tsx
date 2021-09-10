import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AppRoute } from './app.routes';
import { useAuth } from '../hooks/auth';
import { SignIn } from '../screens/SignIn'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

export function Route() {
  const { user } = useAuth();
  return (
    <NavigationContainer theme={MyTheme}>
      {user.id ? <AppRoute /> : <SignIn />}
    </NavigationContainer>
  )
}