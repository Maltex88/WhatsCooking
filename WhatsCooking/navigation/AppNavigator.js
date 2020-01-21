import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigation';
import LoginNavigator from './LoginNavigator';

import LoadingScreen from '../screens/LoadingScreen';

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    Login: LoginNavigator,
    Main: DrawerNavigator
  })
);
