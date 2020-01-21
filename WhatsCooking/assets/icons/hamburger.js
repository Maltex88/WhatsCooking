/* @flow weak */
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const HamburgerIcon = ({}) => {
  return (

     <Ionicons
       {
     ...Platform.select({
       ios: {
         name: 'ios-contact',
         size: 30,
         color: tintColor,
       },
       android: {
         name: 'md-person',
         size: 30,
         color: tintColor,
       }
     })
   }
 />

  )
}

export default HamburgerIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
