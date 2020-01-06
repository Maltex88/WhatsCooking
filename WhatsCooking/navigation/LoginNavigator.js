import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LoginNavigator = (props) => (
  <View style={styles.container}>
    <Text>I'm LoginNavigator</Text>
    <Button
      title='Login'
      onPress={() => props.navigation.navigate('Main')}
    />
  </View>
);

export default LoginNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
