/* @flow weak */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const fetchRecepieDetails = (itemId) => {

}


const RecepieDetailsScreen = (props) => {
  const { navigation } = props;
  let recepieData = [navigation.getParam('total', 'NO-ID')]
  fetchRecepieDetails()

  useEffect(() => {

  })

  return (
    <View style={styles.container}>
        <FlatList
          data={recepieData}
          renderItem={({ item }) =>
            <View style={{ marginVertical: 15 }}>
              <View style={{justifyContent: 'center', alignSelf: 'center', width: '90%', borderRadius: 10}}>
              <Text style={{textAlign: 'center', fontSize: 20}}>{item.title}</Text>
                <ImageBackground style={{height: 250, width: '100%' }}  source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}} imageStyle={{ borderRadius: 25 }}>
                  <Text style={{backgroundColor: 'green', width: '20%', top: 15, justifyContent: 'center' }}>show icon to addto favorit</Text>
                  </ImageBackground>

              </View>

                <View style={{flexDirection: 'row',  left: '5%'}}>
                  <Text style={{marginTop: 5, alignSelf: 'center'}}>Prep Time: {item.readyInMinutes} min</Text>

                </View>
            </View>}
          keyExtractor={item => item.id.toString()}
        />

    </View>
  );
}


export default RecepieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
