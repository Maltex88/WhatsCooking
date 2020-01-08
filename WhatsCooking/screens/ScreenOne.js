import React from 'react';
import { View, StyleSheet, Button, Text, FlatList } from 'react-native';

import ScreenName from '../components/ScreenName.js'
import Header from '../components/Header.js'
import firebase from 'firebase';
import {connect} from 'react-redux';

class ScreenOne extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <View style={styles.container}>
          <FlatList
            numColumns={5}
            data={this.props.userIngredients}
            renderItem={({item}) => <Text style={styles.selectProt}>{item.type}</Text> }
            keyExtractor={item => item.key}
          />
        </View>
        <View style={styles.container}>
          <Button title='sign out' onPress={() => firebase.auth().signOut()}/>
        </View>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userIngredients: state.selectProtein
  }
}
export default connect(mapStateToProps)(ScreenOne)


const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    margin: 5,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  selectProt: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    margin: 5,
    padding: 5,
    fontSize: 17,
  }
});
