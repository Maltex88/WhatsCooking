/* @flow weak */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';


const LoadingScreen = (props) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  let checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function(user)
    {
      if(user)
      {
        props.navigation.navigate('Main')
      }
      else {
        props.navigation.navigate('Login')
      }
    })
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  )
};



export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
