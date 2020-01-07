import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import ScreenName from '../components/ScreenName.js'
import Header from '../components/Header.js'
import firebase from 'firebase';

export default class ScreenOne extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <View style={styles.container}>
          <ScreenName name={'Screen one'} />
          <Button title='sign out' onPress={() => firebase.auth().signOut()}/>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
