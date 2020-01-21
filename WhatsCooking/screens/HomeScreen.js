import React, {useEffect} from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity, ImageBackground, TextInput, Keyboard, Image, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';

import firebase from 'firebase';
import {connect} from 'react-redux';



const recepieSearchUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
const apiKey = 'apiKey=2b04a71c0d6443a4b1de041bbb0574a6';
let searchWords = '';
const numberOfItems = '&number=2';
let otherSearchOptions = '&sort=popularity'



const ClearSearchField = (onChangeText, setLoading, loading) => {
  onChangeText('')
  let isLoading = !loading
  setLoading(isLoading)
  Keyboard.dismiss()
}
const Item = ({ title }) => {
  return (
    <View style={styles.searchWordContainer}>
    <TouchableOpacity
    style={styles.searchWord}>
    <Text style={styles.searchWordText}>{title}</Text>
    </TouchableOpacity>
    <Button title='del'  />
    </View>
  );
}
const RandomRecepies = (searchResult, setsearchResult) => {
  console.log('do i run?')
  // fetch(`https://api.spoonacular.com/recipes/random?apiKey=2b04a71c0d6443a4b1de041bbb0574a6&number=1&tags=main+course`, {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'Application/json',
  //     'Content-type': 'Application/json',
  //     "Authorization": '2b04a71c0d6443a4b1de041bbb0574a6'
  //   },
  // })
  // .then(response => response.json())
  // .then(responseJson => {
  //
  //   console.log(responseJson.recipes)
  //   setsearchResult([
  //     ...searchResult,
  //     ...responseJson.recipes
  //   ]);
  //     setLoading(false)
  // })
  // .catch(error => {
  //   console.error(error);
  // });
}
const QuickSearch = (recepieString, setsearchResult, searchResult) => {
  // setLoading(true)
  // setsearchResult([]);
  // fetch(`https://api.spoonacular.com/recipes/search?apiKey=2b04a71c0d6443a4b1de041bbb0574a6&query=${recepieString}&number=10`, {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'Application/json',
  //     'Content-type': 'Application/json',
  //     "Authorization": '2b04a71c0d6443a4b1de041bbb0574a6'
  //   },
  // })
  // .then(response => response.json())
  // .then(responseJson => {
  //   setsearchResult([
  //     ...searchResult,
  //     ...responseJson.results
  //   ]);
  //     setLoading(false)
  // })
  // .catch(error => {
  //   console.error(error);
  // });
}

const HomeScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(new Map());
  const [searchResult, setsearchResult] = React.useState([]);
  const [recepieString, onChangeText] = React.useState('');

  useEffect(() => {
    // RandomRecepies(searchResult, setsearchResult);
  },[]);

  const onSelect = React.useCallback(
    title => {
      const newSelected = new Map(selected);
      newSelected.set(title, !selected.get(title));
      setSelected(newSelected);
    },
    [selected],
  );

    return (
      <View style={styles.MainContainer}>
        { loading ?
          (
            <View style={styles.MainContainer}>
              <ImageBackground style={styles.QuicksearchContainer} source={require('../assets/cook-366875_640.jpg')}>
                <View>
                  <Searchbar
                    style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', alignSelf: 'center', top: '10%', }}
                    placeholder="Search for recepies"
                    onChangeText={text => onChangeText(text)}
                    value={recepieString}
                    onIconPress={() => QuickSearch(recepieString, setsearchResult, searchResult, ClearSearchField(onChangeText, setLoading, loading))}
                    onSubmitEditing={()=> QuickSearch(recepieString, setsearchResult, searchResult, ClearSearchField(onChangeText, setLoading, loading))}
                  />
                </View>
              </ImageBackground>
              <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>
            </View>
          ):
          (
            <View style={styles.MainContainer}>
              <ImageBackground style={styles.QuicksearchContainer} source={require('../assets/cook-366875_640.jpg')}>
                <View>
                  <Searchbar
                    style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', alignSelf: 'center', top: '10%', }}
                    placeholder="Search for recepies"
                    onChangeText={text => onChangeText(text)}
                    value={recepieString}
                    onIconPress={() => QuickSearch(recepieString, setsearchResult, searchResult, clearSearchField(onChangeText, setLoading, loading))}
                    onSubmitEditing={()=> QuickSearch(recepieString, setsearchResult, searchResult, clearSearchField(onChangeText, setLoading, loading))}
                  />
                </View>
              </ImageBackground>

              <View style={styles.searchResultsContainer}>
                <FlatList
                  data={searchResult}
                  renderItem={({ item }) =>
                    <View style={{ marginVertical: 15 }}>
                      <View style={{justifyContent: 'center', alignSelf: 'center', width: '90%', borderRadius: 10}}>
                        <ImageBackground style={{height: 250, width: '100%' }}  source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}} imageStyle={{ borderRadius: 25 }}>
                          <Text style={{backgroundColor: 'green', width: '20%', top: 15, justifyContent: 'center' }}>show icon to addto favorit</Text>
                        </ImageBackground>
                      </View>
                        <Text style={{marginTop: 5, left: '5%'}}>{item.title}</Text>
                        <View style={{flexDirection: 'row',  left: '5%'}}>
                          <Text style={{marginTop: 5, alignSelf: 'center'}}>Prep Time: {item.readyInMinutes} min</Text>
                          <TouchableOpacity style={styles.showInstructionsButton} onPress={() => props.navigation.navigate('ScreenTwo', {itemId: item.id, itemImg: item.image, total: item}) } >
                            <Text style={{color: 'white'}}>Show me the instructions!</Text>
                          </TouchableOpacity>
                        </View>
                    </View>}
                  keyExtractor={item => item.id.toString()}
                />
              </View>

            </View>) }

            <TouchableOpacity style={styles.showInstructionsButton} onPress={() => props.navigation.navigate('ScreenTwo') } >
            <Text style={{color: 'white'}}>Show me the instructions!</Text>
            </TouchableOpacity>

      </View>
    );

}

function mapStateToProps(state) {
  return {
    userIngredients: state.selectProtein
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addItem: (value) => dispatch({type: 'ADDITEM', value })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1
  },
  QuicksearchContainer: {
    height: 205
  },
  searchWordContainer: {
    flexDirection: 'row'
  },
  searchWord: {
    backgroundColor: '#108792'
  },
  searchWordText: {
    color: 'white',
    fontSize: 15,
    padding: 10,
  },
  searchResultsContainer: {
    flex: 1
  },
  showInstructionsButton: {
    backgroundColor: '#108792',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5,
    padding: 10
  },
  container: {
    flex: 0.1,
  }
});


/*/*,{itemId: item.id, itemImg: item.image, total: item} */

/*
<ImageBackground style={styles.QuicksearchContainer} source={require('../assets/cook-366875_640.jpg')}>

  <View style={{}}>

    <Searchbar
      style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', alignSelf: 'center', top: '10%', }}
      placeholder="Search for recepies"
      onChangeText={text => onChangeText(text)}
      value={recepieString}
      onIconPress={() => QuickSearch(recepieString, setsearchResult, searchResult, clearSearchField(onChangeText, setLoading, loading))}
      onSubmitEditing={()=> QuickSearch(recepieString, setsearchResult, searchResult, clearSearchField(onChangeText, setLoading, loading))}
    />
  </View>
</ImageBackground>



<View style={styles.searchResultsContainer}>
  <FlatList
    data={searchResult}
    renderItem={({ item }) =>
      <View style={{ marginVertical: 15 }}>
        <View style={{justifyContent: 'center', alignSelf: 'center', width: '90%', borderRadius: 10}}>
          <ImageBackground style={{height: 250, width: '100%' }}  source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}} imageStyle={{ borderRadius: 25 }}>
            <Text style={{backgroundColor: 'green', width: '20%', top: 15, justifyContent: 'center' }}>show icon to addto favorit</Text>
            </ImageBackground>

        </View>

          <Text style={{marginTop: 5, left: '5%'}}>{item.title}</Text>
          <View style={{flexDirection: 'row',  left: '5%'}}>
            <Text style={{marginTop: 5, alignSelf: 'center'}}>Prep Time: {item.readyInMinutes} min</Text>
            <TouchableOpacity style={styles.showInstructionsButton} onPress={() => props.navigation.navigate('ScreenTwo', {itemId: item.id, itemImg: item.image, total: item}) } >
              <Text style={{color: 'white'}}>Show me the instructions!</Text>
            </TouchableOpacity>
          </View>
      </View>}
    keyExtractor={item => item.id.toString()}
  />
</View>

<View style={styles.searchWordContainer}>

</View>

<View style={styles.container}>


</View>
*/





  /*
<Button title='sign out' onPress={() => firebase.auth().signOut()}/>
  */
  /*
  <View style={styles.searchWordContainer}>
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
  </View>*/
    /*
    <View style={styles.searchResultsContainer}>
      <FlatList
        data={searchResult}
        renderItem={({ item }) =>
        <View><Text>{item.title}</Text></View>}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
      onPress={() => SearchForRecepies(selected, searchResult, setsearchResult)}
      style={{backgroundColor: '#108792', padding: 10}}>
      <Text style={{color: 'white', fontSize: 15}}>Search</Text>
      </TouchableOpacity>
    </View>
    */

   /*
   Adding items to list, use for add ingredients and spices
   <View style={{flexDirection: 'row'}}>
     <TextInput
     style={{ marginLeft: 15,borderColor: 'white', borderWidth: 1, width: 130, backgroundColor: 'white' }}
     onChangeText={text => onChangeText(text)}
     value={value}
     minLength={40}
     />
     <Button title="+" style={{height: 10}} onPress={() => props.addItem(value, clearSearchField(onChangeText) )} />
   </View>

   */

    /*
    how to select items..
    function Item({ title, selected, onSelect }) {
      console.log(title, selected)
      // setSelected(true);

      // newSelected.set(title, !selected.get(title));
      // setSelected(newSelected);


      return (
        <View>
          <TouchableOpacity
          onPress={() => onSelect(title)}
          style={[styles.list, {backgroundColor: selected ? '#108792' : 'white'}]}>
          <Text style={[styles.title, {color: selected ? 'white' : 'black'}]}>{title}</Text>
          </TouchableOpacity>
          <Button title='del' />
        </View>
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

    const HomeScreen = (props) => {
      console.log('when do i run?')
      const [selected, setSelected] = React.useState(new Map());
      const [searchResult, setsearchResult] = React.useState([]);
      const [value, onChangeText] = React.useState('');
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
            <Text>Quick search</Text>
            <Button title="Add +" onPress={() => props.addItem(value)} />
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 130, margin: 15, padding: 4 }}
              onChangeText={text => onChangeText(text)}
              value={value}
              minLength={40}
              />
              <TouchableOpacity
                onPress={() => SearchForRecepies(selected, searchResult, setsearchResult)}
                style={{backgroundColor: '#108792', padding: 10}}>
                <Text style={{color: 'white', fontSize: 15}}>Search</Text>
              </TouchableOpacity>
              <FlatList
              data={searchResult}
              renderItem={({ item }) =>
              <View><Text>{item.title}</Text></View>}
              keyExtractor={item => item.id.toString()}
              />
            </View>
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
      console.log('add chicken to dispatch, sending it to action')
      return {
        addItem: (value) => dispatch({type: 'ADDITEM', value })
      }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
    */
