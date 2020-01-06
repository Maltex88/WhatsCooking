import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigation';
import LoginNavigator from './LoginNavigator';
export default createAppContainer(
  createSwitchNavigator({
    Login: LoginNavigator,
    Main: DrawerNavigator
  })
);
