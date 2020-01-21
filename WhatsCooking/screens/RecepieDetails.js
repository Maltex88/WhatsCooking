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

const fetchRecepieDetails = (itemId) => {
  // fetch(`https://api.spoonacular.com/recipes/{itemId}/analyzedInstructions?apiKey=2b04a71c0d6443a4b1de041bbb0574a6`, {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'Application/json',
  //     'Content-type': 'Application/json',
  //     "Authorization": '2b04a71c0d6443a4b1de041bbb0574a6'
  //   },
  // })
  // .then(response => response.json())
  // .then(responseJson => {
  //   console.log(responseJson.recipes)
  // })
  // .catch(error => {
  //   console.error(error);
  // });
}
const recepieData = [
{title: 'pasta of pasta el fredo por favor', readyInMinutes: 90, image: '../assets/spaghetti-3547078_640.jpg', id: '01240124'  },
]

let mapping = [];
let cookingSteps = [];
let steps = [];
const detailedRecepieData = [
    {
        "name": "",
        "steps": [
            {
                "equipment": [
                    {
                        "id": 404784,
                        "image": "oven.jpg",
                        "name": "oven",
                        "temperature": {
                            "number": 200.0,
                            "unit": "Fahrenheit"
                        }
                    }
                ],
                "ingredients": [],
                "number": 1,
                "step": "Preheat the oven to 200 degrees F."
            },
            {
                "equipment": [
                    {
                        "id": 404661,
                        "image": "whisk.png",
                        "name": "whisk"
                    },
                    {
                        "id": 404783,
                        "image": "bowl.jpg",
                        "name": "bowl"
                    }
                ],
                "ingredients": [
                    {
                        "id": 19334,
                        "image": "light-brown-sugar.jpg",
                        "name": "light brown sugar"
                    },
                    {
                        "id": 19335,
                        "image": "sugar-in-bowl.png",
                        "name": "granulated sugar"
                    },
                    {
                        "id": 18371,
                        "image": "white-powder.jpg",
                        "name": "baking powder"
                    },
                    {
                        "id": 18372,
                        "image": "white-powder.jpg",
                        "name": "baking soda"
                    },
                    {
                        "id": 12142,
                        "image": "pecans.jpg",
                        "name": "pecans"
                    },
                    {
                        "id": 20081,
                        "image": "flour.png",
                        "name": "all purpose flour"
                    },
                    {
                        "id": 2047,
                        "image": "salt.jpg",
                        "name": "salt"
                    }
                ],
                "number": 2,
                "step": "Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl."
            },
            {
                "equipment": [
                    {
                        "id": 404661,
                        "image": "whisk.png",
                        "name": "whisk"
                    },
                    {
                        "id": 404783,
                        "image": "bowl.jpg",
                        "name": "bowl"
                    }
                ],
                "ingredients": [
                    {
                        "id": 2050,
                        "image": "vanilla-extract.jpg",
                        "name": "vanilla extract"
                    },
                    {
                        "id": 93622,
                        "image": "vanilla.jpg",
                        "name": "vanilla bean"
                    },
                    {
                        "id": 1230,
                        "image": "buttermilk.jpg",
                        "name": "buttermilk"
                    },
                    {
                        "id": 1123,
                        "image": "egg.png",
                        "name": "egg"
                    }
                ],
                "number": 3,
                "step": "Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 1123,
                        "image": "egg.png",
                        "name": "egg"
                    }
                ],
                "number": 4,
                "step": "Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix."
            },
            {
                "equipment": [],
                "ingredients": [],
                "length": {
                    "number": 15,
                    "unit": "minutes"
                },
                "number": 5,
                "step": "Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using."
            },
            {
                "equipment": [
                    {
                        "id": 404779,
                        "image": "griddle.jpg",
                        "name": "griddle"
                    },
                    {
                        "id": 404645,
                        "image": "pan.png",
                        "name": "frying pan"
                    }
                ],
                "ingredients": [],
                "length": {
                    "number": 3,
                    "unit": "minutes"
                },
                "number": 6,
                "step": "Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer."
            },
            {
                "equipment": [
                    {
                        "id": 404784,
                        "image": "oven.jpg",
                        "name": "oven",
                        "temperature": {
                            "number": 200.0,
                            "unit": "Fahrenheit"
                        }
                    }
                ],
                "ingredients": [],
                "number": 7,
                "step": "Transfer the pancakes to a platter and keep warm in a 200 degree F oven."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 10014037,
                        "image": "bourbon.png",
                        "name": "bourbon"
                    }
                ],
                "number": 8,
                "step": "Serve 6 pancakes per person, top each with some of the bourbon butter."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 19336,
                        "image": "powdered-sugar.jpg",
                        "name": "powdered sugar"
                    },
                    {
                        "id": 19911,
                        "image": "maple-syrup.png",
                        "name": "maple syrup"
                    }
                ],
                "number": 9,
                "step": "Drizzle with warm maple syrup and dust with confectioners' sugar."
            },
            {
                "equipment": [],
                "ingredients": [
                    {
                        "id": 12142,
                        "image": "pecans.jpg",
                        "name": "pecans"
                    }
                ],
                "number": 10,
                "step": "Garnish with fresh mint sprigs and more toasted pecans, if desired."
            }
        ]
    },
    {
        "name": "Bourbon Molasses Butter",
        "steps": [
            {
                "equipment": [
                    {
                        "id": 404669,
                        "image": "sauce-pan.jpg",
                        "name": "sauce pan"
                    }
                ],
                "ingredients": [
                    {
                        "id": 10014037,
                        "image": "bourbon.png",
                        "name": "bourbon"
                    },
                    {
                        "id": 19335,
                        "image": "sugar-in-bowl.png",
                        "name": "sugar"
                    }
                ],
                "number": 1,
                "step": "Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool."
            },
            {
                "equipment": [
                    {
                        "id": 404771,
                        "image": "food-processor.png",
                        "name": "food processor"
                    }
                ],
                "ingredients": [
                    {
                        "id": 19304,
                        "image": "molasses.jpg",
                        "name": "molasses"
                    },
                    {
                        "id": 10014037,
                        "image": "bourbon.png",
                        "name": "bourbon"
                    },
                    {
                        "id": 2047,
                        "image": "salt.jpg",
                        "name": "salt"
                    }
                ],
                "number": 2,
                "step": "Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth."
            },
            {
                "equipment": [
                    {
                        "id": 404730,
                        "image": "plastic-wrap.jpg",
                        "name": "plastic wrap"
                    },
                    {
                        "id": 404783,
                        "image": "bowl.jpg",
                        "name": "bowl"
                    }
                ],
                "ingredients": [],
                "number": 3,
                "step": "Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld."
            },
            {
                "equipment": [],
                "ingredients": [],
                "length": {
                    "number": 30,
                    "unit": "minutes"
                },
                "number": 4,
                "step": "Remove from the refrigerator about 30 minutes before using to soften."
            }
        ]
    }
];
const RecepieDetailsScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  // const { navigation } = props;
  // let recepieData = [navigation.getParam('total', 'NO-ID')]
  // fetchRecepieDetails()
  useEffect(() => {
        let mapping = detailedRecepieData.map((item, i) => {
            return item.steps.map((item, i) => {
            return {
              step: item.step,
              number: item.number,
              id: Math.random(1000)
            };
          });
        })
        steps = mapping[0]
    const timer = window.setTimeout(() => {
      console.log('yes2')
      setLoading(false)
    }, 3000);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={recepieData}
          renderItem={({ item }) =>
            <View style={{ marginVertical: 15}}>
              <View style={{justifyContent: 'center', alignSelf: 'center', width: '90%', }}>
                <Text style={{textAlign: 'center', fontSize: 20}}>{item.title}</Text>
                <ImageBackground style={{height: 250, width: '100%' }} source={require(`../assets/spaghetti-3547078_640.jpg`)}  imageStyle={{ borderTopRightRadius: 25,borderTopLeftRadius: 25  }}>
                  <Text style={{backgroundColor: 'green', width: '20%', top: 15, justifyContent: 'center' }}>show icon to addto favorit</Text>
                </ImageBackground>
              </View>

              {loading ? (<View style={{top: 10}}><ActivityIndicator size="large" color="#0000ff"/></View>) :
               (
                 <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <TouchableOpacity style={{backgroundColor: '#108792', width: '45%', height: 30, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 10}}>
                      <Text style={{color: 'white'}}>Ingredients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#108792', width: '45%', height: 30, alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: 10,}}>
                      <Text style={{color: 'white'}}>Instructions</Text>
                    </TouchableOpacity>
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
    backgroundColor: '#f5edd6'

  },
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
