/* @flow weak */
import ScreenName from '../components/ScreenName.js'
import Header from '../components/Header.js'
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import firebase from 'firebase';
const ScreenThree = (props) => (
  <View style={styles.container}>

  <View style={{flex: 1,justifyContent: 'center', alignSelf: 'center'}}>
    <Button title='sign out' onPress={() => firebase.auth().signOut()}/>
  </View>
  </View>
);

export default ScreenThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
