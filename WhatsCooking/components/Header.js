import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// pull in from DrawerTrigger.js
import DrawerTrigger from './DrawerTrigger'

class Header extends React.Component {

  render() {
    return (
      <View style={styles.header}>

        <View style={styles.title}>
          <Text style={{fontFamily: 'Pacifico-Regular', fontSize: 20, color: 'white',}}>Whats For Dinner?</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    paddingTop: 35,
    backgroundColor: '#108792',
    alignItems: 'center'
  },
  title: {
    alignItems: 'center',
    width: '60%',
    bottom: 5,
  }
});

export default Header;
/*
for hamburger menu
<DrawerTrigger />
*/
