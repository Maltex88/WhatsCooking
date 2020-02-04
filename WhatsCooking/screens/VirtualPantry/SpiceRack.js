import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  FlatList,
  Button,
  ScrollView
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';


const SpiceRack = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [recepieString, onChangeText] = React.useState('');
  const [filter, setFilter] = React.useState('')
  const [spicesData, setSpiceData] = React.useState([])
  const [filterdSpices, setFilteredSpices] = React.useState([])
  const { navigation } = props;
  let userId = [navigation.getParam('userId', 'NO-ID')]



  const SpiceListener = () => {
    console.log('running more then once?')
    firebase.database().ref('users/' + userId + '/spices')
      .on('value', function(snapshot) {
        setSpiceData(...spicesData, snapshot.val());
        setFilteredSpices(...spicesData, snapshot.val())
        setLoading(false)
      });
  }
  const DeleteItem = (item) => {
    firebase.database().ref('users/' + userId + '/spices/' + item).remove()
  }

  const ClearSearchField = () => {
    onChangeText('')
    setFilter('')
    Keyboard.dismiss()
  }
  const AddSpicesToDb = (text) => {
    firebase.database().ref('users/' + userId + '/spices').push(
      {
        title: text,
      }
    );
  };

  const filterText = ( text) => {
    let kaos = {...filterdSpices}
      for (var key in kaos) {
        let id = key;
        // skip loop if the property is from prototype
        if (!kaos.hasOwnProperty(key)) continue;

        var obj = kaos[key];
        for (var prop in obj) {
          // skip loop if the property is from prototype
          if (!obj.hasOwnProperty(prop)) continue;

          if(obj[prop].substring(0, text.length) === text.substring(0, text.length)) {

          } else {
            delete kaos[`${id}`]
          }
        }
    }
    setSpiceData({...spicesData, ...kaos});
  }
  const filterDeletedText = (text) => {

    let newObj = {...filterdSpices}
    for (var key in newObj) {
      let id = key;
      // skip loop if the property is from prototype
      if (!newObj.hasOwnProperty(key)) continue;

      var obj = newObj[key];
      for (var prop in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;

        if(obj[prop].substring(0, text.length) === text.substring(0, text.length)) {

        } else {
          delete newObj[`${id}`]
        }
      }
  }
      setSpiceData({...spicesData, ...newObj});
  }

  const FilterSpices = (text, backspace) => {
    if(!text) {
      setSpiceData({...filterdSpices});
    } else {
      if(backspace) {
        filterDeletedText(text)
      } else {
        filterText( text)
      }
    }
  }

  useEffect(() => {
    SpiceListener();
  },[])


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={{margin: 5}}>Add spices to keep track of what you have at home</Text>
        <Searchbar
          style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', alignSelf: 'center', top: '10%', }}
          placeholder="Add Spices"
          onChangeText={text => onChangeText(text)}
          value={recepieString}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              onChangeText(text, nativeEvent)
            }
          }}
          onIconPress={() => AddSpicesToDb(recepieString, ClearSearchField())}
          onSubmitEditing={()=> AddSpicesToDb(recepieString, ClearSearchField())}
        />
      </View>
      <View style={styles.spiceContainer}>
        {loading ? (<View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" color="#0000ff"/></View>) :
         (<View style={{ flex: 1, margin: 10}}>
            <ScrollView style={{flex: 1,}}>
              <Searchbar
              style={{ width: '80%', backgroundColor: 'white', justifyContent: 'center', alignSelf: 'center',  }}
              placeholder="Search your spicerack"
              onChangeText={text => FilterSpices(text, setFilter(text))}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  FilterSpices(filter, nativeEvent.key)
                }
              }}
              value={filter}
              onIconPress={() => QuickSearch(ClearSearchField())}
              onSubmitEditing={()=> QuickSearch(ClearSearchField())}
              />
                <ScrollView
                 contentContainerStyle={{flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: '5%'}}
                 horizontal={true}>
                   {
                      Object.keys(spicesData).map((item, index) => (
                         <View style={{borderRadius: 2, borderColor: 'white', borderWidth: 2, padding: 5, margin: 5, flexDirection: 'row'}}key = {item}>
                            <Text style={{color: 'black', margin: 5}}>{spicesData[item].title}</Text>
                            <Button  title='Del' onPress={() => DeleteItem(item)}/>
                         </View>
                      ))
                   }
                </ScrollView>
            </ScrollView>
           </View>)}
      </View>
    </View>
  )
};

export default SpiceRack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  infoContainer: {
    backgroundColor: '#f5edd6',
    flex: 0.25,
    margin: 5,
    borderWidth: 3,
  },
  spiceContainer: {
    flex: 0.75,
    backgroundColor: '#f5edd6',
    margin: 5,
    borderWidth: 3,
  }
});

/*<FlatList
 horizontal={true}
 scrollEnabled={false}
  data={Object.keys(spicesData)}
  renderItem={({ item }) =>
    <View style={{}}>
      <Text style={{color: 'black', margin: 5}}>{spicesData[item].title}</Text>
    </View>}
  keyExtractor={(index) => index.toString()}
/>*/
