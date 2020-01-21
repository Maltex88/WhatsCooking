/* @flow weak */
import ScreenName from '../components/ScreenName.js'
import Header from '../components/Header.js'
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ScreenThree = (props) => (
  <View style={styles.container}>

  <View style={{flex: 1,justifyContent: 'center', alignSelf: 'center'}}>
    <Text>Yess</Text>
  </View>
  </View>
);

export default ScreenThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
