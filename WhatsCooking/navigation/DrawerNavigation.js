import React from 'react';
import {View,Text} from 'react-native';


import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Header from '../components/Header'
import ScreenOne from '../screens/ScreenOne';
import ScreenTwo from '../screens/ScreenTwo';
import ScreenThree from '../screens/ScreenThree';

import RecepieDetailsScreen from '../screens/RecepieDetails';

const HomeAndDetailStack = createStackNavigator({
  ScreenOne: {screen: ScreenOne},
  ScreenTwo: {screen: RecepieDetailsScreen}
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerShown: false,
    };
  }
})


const DashboardTabNavigator = createBottomTabNavigator({
  HomeAndDetailStack,
  ScreenTwo,
  ScreenThree
},{
  navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        // headerShown: false,
        headerTitle: () => <Text style={{fontFamily: 'Pacifico-Regular', fontSize: 20, color: 'white',}}>Whats For Dinner?</Text>
      };
    }
});

const StackNavigator = createStackNavigator({
  Home: DashboardTabNavigator

}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: '#108792',
        },
      };
    }
  })

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: StackNavigator
  }
});

export default DrawerNavigator;
