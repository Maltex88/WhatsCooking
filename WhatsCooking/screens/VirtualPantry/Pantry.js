/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Pantry = ({}) => (
  <View style={styles.container}>
    <Text>I'm Pantry</Text>
  </View>
);

export default Pantry;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 0.5,
    borderWidth: 2,
    margin: 15,
    backgroundColor: '#f5edd6'
  },
});
