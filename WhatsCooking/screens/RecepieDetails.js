/* @flow weak */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';


const DisplayIngredientsButton = (showIngredients, setIngredients, showInstructions, setInstruction) => {
  if(showIngredients) {
    setInstruction(false)
  } else {
    setInstruction(false)
    setIngredients(true)
  }
}
const DisplayInstructionButton = (showIngredients, setIngredients, showInstructions, setInstruction) => {
  if(showInstructions) {
    setIngredients(false)
  } else {
    setInstruction(true)
    setIngredients(false)
  }
}


let cookingIngredients = [];
let mapping = [];
let steps = [];

const RecepieDetailsScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [showIngredients, setIngredients] = React.useState(true);
  const [showInstructions, setInstruction] = React.useState(false);
  const { navigation } = props;
  let recepieData = [navigation.getParam('total', 'NO-ID')]

  const mapRecipesIngredientsAndInstructions = () => {
    if(recepieData[0].analyzedInstructions.length === 1) {
      steps  = recepieData[0].analyzedInstructions[0].steps.map((item, i) => {
          return {
            step: item.step,
            number: item.number,
            id: recepieData[0].id + item.number
          }
      });
      } else {
        return
        //loop and make steps and ingredients into to parts
    }

    cookingIngredients = recepieData[0].extendedIngredients.map((item, i) => {
      return {
        name: item.original,
        id: item.original + Math.random(100)
      };
    });

    const uniqueIngredients = Array.from(new Set(cookingIngredients.map(a => a.name)))
      .map(name => {
        return cookingIngredients.find(a => a.name === name)
    })
    console.log(uniqueIngredients)
    cookingIngredients = uniqueIngredients
  }
  useEffect(() => {
    mapRecipesIngredientsAndInstructions()
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={recepieData}
          renderItem={({ item }) =>
            <View style={{ marginVertical: 15}}>
              <View style={{justifyContent: 'center', alignSelf: 'center', width: '90%', }}>
                <Text style={{textAlign: 'center', fontSize: 20}}>{item.title}</Text>
                <ImageBackground style={{height: 250, width: '100%' , borderColor: 'black', borderWidth: 1,  borderTopRightRadius: 25,borderTopLeftRadius: 25}} source={{uri:   `${item.image}`}}  imageStyle={{ borderTopRightRadius: 25,borderTopLeftRadius: 25  }}>

                </ImageBackground>
              </View>

              {loading ? (<View style={{top: 10}}><ActivityIndicator size="large" color="#0000ff"/></View>) :
               (<View>
                 <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <TouchableOpacity
                      style={[(showIngredients) ? styles.selectedButton : styles.button]}
                      onPress={() => DisplayIngredientsButton(showIngredients, setIngredients, showInstructions, setInstruction)}>
                      <Text style={{color: 'black'}}>Ingredients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[(showInstructions) ? styles.selectedButton : styles.button]}
                      onPress={() => DisplayInstructionButton(showIngredients, setIngredients, showInstructions, setInstruction)}>
                      <Text style={{color: 'black'}}>Instructions</Text>
                    </TouchableOpacity>
                 </View>
                 <View style={styles.ingredientStyle}>
                 {showIngredients ? (<View><FlatList
                       data={cookingIngredients}
                       renderItem={({ item }) =>
                         <View style={{ margin: '3%', marginTop: 20}}>
                           <Text>{item.name}</Text>
                         </View>}
                       keyExtractor={item => item.id.toString()}
                       /></View>) : (<View><FlatList
                       data={steps}
                       renderItem={({ item }) =>
                         <View style={{ margin: '5%'}}>
                           <Text>#{item.number}</Text>
                           <Text>{item.step}</Text>
                         </View>}
                       keyExtractor={item => item.id.toString()}
                       /></View>)}

                 </View>
                </View>
               )}

             </View>}
          keyExtractor={item => item.id.toString()}
          />
    </SafeAreaView>

  );
}


export default RecepieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white',
    width: '45%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1

  },
  selectedButton: {
    backgroundColor: '#f5edd6',
    width: '45%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  buttonLeft: {
    //borderBottomLeftRadius: 10
  },
  buttonRight: {
  //  borderBottomRightRadius: 10
  },
  ingredientStyle: {
    marginHorizontal: '5%',
    backgroundColor: '#f5edd6',
    borderColor: 'black',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  }
});
/*      <FlatList
        data={steps}
        renderItem={({ item }) =>
          <View style={{ margin: '5%', flex: 0.6 }}>
            <Text>#{item.number}</Text>
            <Text>{item.step}</Text>
          </View>}
        keyExtractor={item => item.id.toString()}
        />*/
//source for fetch..
// source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}}
