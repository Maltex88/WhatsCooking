import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';

const LoadingScreen = (props) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  let checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function(user)
    {
      if(user)
      {
        props.setUser(user.uid)
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

function mapDispatchToProps(dispatch) {
  return {
    setUser: (value) => dispatch({type: 'SETUSERID', value })
  }
}
export default connect(null, mapDispatchToProps)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
