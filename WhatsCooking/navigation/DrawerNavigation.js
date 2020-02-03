import React from 'react';
import {View,Text} from 'react-native';


import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Header from '../components/Header'
import HomeScreen from '../screens/HomeScreen';
import Virtuelpantry from '../screens/VirtualPantry/VirtualPantry';
import ScreenThree from '../screens/ScreenThree';

import SpiceRack from '../screens/VirtualPantry/SpiceRack';
import Pantry from '../screens/VirtualPantry/Pantry';
import RecepieDetailsScreen from '../screens/RecepieDetails';

const HomeAndDetailStack = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  ScreenTwo: {screen: RecepieDetailsScreen}
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerShown: false,
    };
  }
})

const PantryStack = createStackNavigator({
  MainPantry: {screen: Virtuelpantry},
  SpiceRack: {screen: SpiceRack},
  Pantry: {screen: Pantry}
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerShown: false,
    };
  }
})


const DashboardTabNavigator = createBottomTabNavigator({
  Home: {screen: HomeAndDetailStack},
  Pantry: {screen: PantryStack},
  Options: {screen: ScreenThree}

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
