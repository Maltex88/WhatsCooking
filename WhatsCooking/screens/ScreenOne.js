import React, {useEffect} from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import ScreenName from '../components/ScreenName.js'
import Header from '../components/Header.js'
import firebase from 'firebase';
import {connect} from 'react-redux';


const recepieSearchUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
const apiKey = 'apiKey=2b04a71c0d6443a4b1de041bbb0574a6';
let searchWords = '';
const numberOfItems = '&number=2';
let otherSearchOptions = '&sort=popularity'
// ?apiKey=YOUR-API-KEY.

function Item({ title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(title)}
      style={[styles.list, {backgroundColor: selected ? '#108792' : 'white'}]}>
        <Text style={[styles.title, {color: selected ? 'white' : 'black'}]}>{title}</Text>
    </TouchableOpacity>
  );
}
function SearchForRecepies(selected, searchResult, setsearchResult) {
  if(selected.size === 0) {
    console.log('Are you sure you want to search without any searchoptions?')
  } else {
    selected.forEach( (value, key, map) => {
      if(value === true) {

        let newString = searchWords.concat(`&query=${key}`)
        searchWords = newString;
        console.log('this..', searchWords)
      } else {
        console.log('user unmarked all searchOptions')
      }

    });
  }
  console.log('Quary', searchWords )
  //Here i should start my fetch..

  fetch(`${recepieSearchUrl + apiKey + searchWords + numberOfItems + otherSearchOptions }`, {
    method: 'GET',
    headers: {
      'Accept': 'Application/json',
      'Content-type': 'Application/json',
      "Authorization": '2b04a71c0d6443a4b1de041bbb0574a6'
    },
  })
  .then(response => response.json())
  .then(responseJson => {
    console.log(responseJson.results)
    setsearchResult([
      ...searchResult,
      ...responseJson.results
    ]);
    console.log(searchResult)
  })
  .catch(error => {
    console.error(error);
  });
  console.log(selected.get('Other'))
};

const ScreenOne = (props) => {
  const [selected, setSelected] = React.useState(new Map());
  const [searchResult, setsearchResult] = React.useState([]);
  const onSelect = React.useCallback(

    title => {
      const newSelected = new Map(selected);
      newSelected.set(title, !selected.get(title));
      setSelected(newSelected);
    },
    [selected],
  );

    return (
      <React.Fragment>
        <Header />
        <View style={styles.container}>
          <FlatList
            numColumns={5}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', marginBottom: 10,}}
            data={props.userIngredients}
            renderItem={({ item }) => (
              <Item
                title={item.type}
                selected={!!selected.get(item.type)}
                onSelect={onSelect}
              />
            )}
            keyExtractor={item => item.key}
            extraData={selected}
          />
          <TouchableOpacity
            onPress={() => SearchForRecepies(selected, searchResult, setsearchResult)}
            style={{backgroundColor: '#108792', padding: 10}}>
            <Text style={{color: 'white', fontSize: 15}}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
             data={searchResult}
             renderItem={({ item }) =>
             <View><Text>{item.title}</Text></View>}
             keyExtractor={item => item.id.toString()}
           />
        </View>
        <View style={styles.container}>

          <Button title='sign out' onPress={() => firebase.auth().signOut()}/>
        </View>
      </React.Fragment>
    );

}

function mapStateToProps(state) {
  return {
    userIngredients: state.selectProtein
  }
}
function mapDispatchToProps(dispatch) {
  return {
    selectItem: (item, index) => dispatch({type: 'TOGGEL_SELECT', index: index, item: item})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenOne)


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
  list: {

    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    margin: 5,
    padding: 5,
    fontSize: 17,
  },
  selected: {
    backgroundColor: "#FA7B5F",
    fontSize: 20,
  },
});

/*   flatlist with redux state, updates slow, select prot no need to be global since recepie search only can be done frpm the home screen
     <FlatList
          extraData={this.props}
          numColumns={5}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', marginBottom: 10,}}
          data={this.props.userIngredients}
          renderItem={({item, index}) =>
            <TouchableOpacity
              style={[styles.list, { backgroundColor: item.isSelected ? '#6e3b6e' : 'white' },]}
              onPress={() => this.props.selectItem(item, index)}  >
              <Text>{item.type}</Text>
            </TouchableOpacity> }
          keyExtractor={item => item.key}
        />
    */
