/* @flow weak */

import React from 'react';
import SpiceRack from './SpiceRack'
import Pantry from './Pantry'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

const Virtuelpantry = (props) => {

  //<Image style={{ }} source={item.img}/>
  //onPress={() => props.navigation.navigate('ScreenTwo', {itemId: item.id, itemImg: item.image, total: item}) }
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.imgContainer} onPress={() => props.navigation.navigate('SpiceRack', {userId: props.usersId}) }>
            <ImageBackground style={styles.img} source={require('../../assets/spices-1009676_640.jpg')}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textDecorationLine: 'underline'}}>Your Virtuel Spicerack</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.imgContainer} onPress={() => props.navigation.navigate('SpiceRack', {userId: props.usersId}) }>
            <ImageBackground style={styles.img} imageStyle={{opacity:0.8}} source={require('../../assets/fruit-428057_1280.jpg')}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textDecorationLine: 'underline'}}>Your Virtuel Pantry</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.imgContainer} onPress={() => props.navigation.navigate('SpiceRack', {userId: props.usersId}) }>
            <ImageBackground style={styles.img} imageStyle={{opacity:0.8}} source={require('../../assets/platter-2009590_1920.jpg')}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textDecorationLine: 'underline'}}>Your favorite recepies</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      </View>
    )
}

function mapStateToProps(state) {
  return {
    usersId: state.userId
  }
}
export default connect(mapStateToProps)(Virtuelpantry)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f5edd6',
  },
  innerContainer: {
    borderWidth: 4,
    backgroundColor:'black',
    flex: 0.33,
    margin: 5,
  },
  imgContainer: {

  },
  img: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'

  }
});
/*
<FlatList
  data={pantryOptions}
  renderItem={({ item }) =>
  <View style={styles.childContainers}>

      <Image style={{margin: 5,width: '95%',}} source={item.img}/>
      <Text>{item.title}</Text>

  </View>}
keyExtractor={item => item.id.toString()}
/>
*/
