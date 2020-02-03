import React, {useEffect} from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity, ImageBackground, TextInput, Keyboard, Image, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';
import firebase from 'firebase';




const recepieSearchUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
const apiKey = 'apiKey=2b04a71c0d6443a4b1de041bbb0574a6';
let searchWords = '';
const numberOfItems = '&number=2';
let otherSearchOptions = '&sort=popularity'

const RandomData =  {
    "recipes": [
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 23,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "preparationMinutes": 30,
            "cookingMinutes": 45,
            "sourceUrl": "http://www.afamilyfeast.com/tomato-tart-smoked-gruyere-cracked-black-pepper/",
            "spoonacularSourceUrl": "https://spoonacular.com/tomato-tart-with-smoked-gruyre-and-cracked-black-pepper-730797",
            "aggregateLikes": 61,
            "spoonacularScore": 48.0,
            "healthScore": 7.0,
            "creditsText": "A Family Feast ",
            "sourceName": "A Family Feast ",
            "pricePerServing": 230.3,
            "extendedIngredients": [
                {
                    "id": 10011529,
                    "aisle": "Produce",
                    "image": "beefsteak-tomato.jpg",
                    "consitency": "solid",
                    "name": "beef steak tomatoes",
                    "original": "2 large ripe beef steak tomatoes, 1¼ pounds",
                    "originalString": "2 large ripe beef steak tomatoes, 1¼ pounds",
                    "originalName": "ripe beef steak tomatoes, 1¼ pounds",
                    "amount": 2.0,
                    "unit": "large",
                    "meta": [
                        "ripe"
                    ],
                    "metaInformation": [
                        "ripe"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "large",
                            "unitLong": "larges"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "large",
                            "unitLong": "larges"
                        }
                    }
                },
                {
                    "id": 99063,
                    "aisle": "Frozen",
                    "image": "pizza-dough.jpg",
                    "consitency": "solid",
                    "name": "bread roll dough",
                    "original": "Flour to roll dough",
                    "originalString": "Flour to roll dough",
                    "originalName": "Flour to roll dough",
                    "amount": 8.0,
                    "unit": "servings",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 8.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 8.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 1001,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "butter-sliced.jpg",
                    "consitency": "solid",
                    "name": "butter",
                    "original": "Butter to grease tart pan (only needed if you are not using a non-stick pan)",
                    "originalString": "Butter to grease tart pan (only needed if you are not using a non-stick pan)",
                    "originalName": "Butter to grease tart pan (only needed if you are not using a non pan)",
                    "amount": 1.0,
                    "unit": "stick",
                    "meta": [
                        "(only needed if you are not using a non-stick pan)"
                    ],
                    "metaInformation": [
                        "(only needed if you are not using a non-stick pan)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "stick",
                            "unitLong": "stick"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "stick",
                            "unitLong": "stick"
                        }
                    }
                },
                {
                    "id": 1001,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "butter-sliced.jpg",
                    "consitency": "solid",
                    "name": "butter",
                    "original": "8 tablespoons cold butter cut into one inch chunks",
                    "originalString": "8 tablespoons cold butter cut into one inch chunks",
                    "originalName": "cold butter cut into one inch chunks",
                    "amount": 8.0,
                    "unit": "tablespoons",
                    "meta": [
                        "cold",
                        "cut into one inch chunks"
                    ],
                    "metaInformation": [
                        "cold",
                        "cut into one inch chunks"
                    ],
                    "measures": {
                        "us": {
                            "amount": 8.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 8.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 1123,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "egg.png",
                    "consitency": "solid",
                    "name": "egg",
                    "original": "1 extra large egg",
                    "originalString": "1 extra large egg",
                    "originalName": "egg",
                    "amount": 1.0,
                    "unit": "extra large",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "extra large",
                            "unitLong": "extra large"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "extra large",
                            "unitLong": "extra large"
                        }
                    }
                },
                {
                    "id": 1125,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "egg-yolk.jpg",
                    "consitency": "solid",
                    "name": "egg yolks",
                    "original": "3 extra large egg yolks",
                    "originalString": "3 extra large egg yolks",
                    "originalName": "egg yolks",
                    "amount": 3.0,
                    "unit": "extra large",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 3.0,
                            "unitShort": "extra large",
                            "unitLong": "extra larges"
                        },
                        "metric": {
                            "amount": 3.0,
                            "unitShort": "extra large",
                            "unitLong": "extra larges"
                        }
                    }
                },
                {
                    "id": 20081,
                    "aisle": "Baking",
                    "image": "flour.png",
                    "consitency": "solid",
                    "name": "flour",
                    "original": "1¼ cups all-purpose flour",
                    "originalString": "1¼ cups all-purpose flour",
                    "originalName": "all-purpose flour",
                    "amount": 1.25,
                    "unit": "cups",
                    "meta": [
                        "all-purpose"
                    ],
                    "metaInformation": [
                        "all-purpose"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.25,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 295.735,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1023,
                    "aisle": "Cheese",
                    "image": "gruyere.jpg",
                    "consitency": "solid",
                    "name": "gruyere cheese",
                    "original": "8 ounces smoked Gruyere cheese, shredded (or to be true to the recipe, use Comte if you can find it)",
                    "originalString": "8 ounces smoked Gruyere cheese, shredded (or to be true to the recipe, use Comte if you can find it)",
                    "originalName": "smoked Gruyere cheese, shredded (or to be true to the recipe, use Comte if you can find it)",
                    "amount": 8.0,
                    "unit": "ounces",
                    "meta": [
                        "smoked",
                        "shredded",
                        "canned",
                        "(or to be true to the recipe, use Comte if you can find it)"
                    ],
                    "metaInformation": [
                        "smoked",
                        "shredded",
                        "canned",
                        "(or to be true to the recipe, use Comte if you can find it)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 8.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 226.796,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 1053,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "fluid-cream.jpg",
                    "consitency": "liquid",
                    "name": "heavy cream",
                    "original": "1 cup heavy cream",
                    "originalString": "1 cup heavy cream",
                    "originalName": "heavy cream",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1033,
                    "aisle": "Cheese",
                    "image": "parmesan.jpg",
                    "consitency": "solid",
                    "name": "parmesan cheese",
                    "original": "¼ cup freshly grated Parmesan cheese",
                    "originalString": "¼ cup freshly grated Parmesan cheese",
                    "originalName": "freshly grated Parmesan cheese",
                    "amount": 0.25,
                    "unit": "cup",
                    "meta": [
                        "freshly grated"
                    ],
                    "metaInformation": [
                        "freshly grated"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 59.147,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1002030,
                    "aisle": "Spices and Seasonings",
                    "image": "pepper.jpg",
                    "consitency": "solid",
                    "name": "pepper",
                    "original": "1 tablespoon coarsely cracked black pepper",
                    "originalString": "1 tablespoon coarsely cracked black pepper",
                    "originalName": "coarsely cracked black pepper",
                    "amount": 1.0,
                    "unit": "tablespoon",
                    "meta": [
                        "black"
                    ],
                    "metaInformation": [
                        "black"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 12147,
                    "aisle": "Produce;Baking",
                    "image": "pine-nuts.png",
                    "consitency": "solid",
                    "name": "pine nuts",
                    "original": "2 tablespoons pine nuts",
                    "originalString": "2 tablespoons pine nuts",
                    "originalName": "pine nuts",
                    "amount": 2.0,
                    "unit": "tablespoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 1012047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consitency": "solid",
                    "name": "sea salt",
                    "original": "½ teaspoon sea salt",
                    "originalString": "½ teaspoon sea salt",
                    "originalName": "sea salt",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 1012047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consitency": "solid",
                    "name": "sea-salt",
                    "original": "¼ teaspoon more of sea salt",
                    "originalString": "¼ teaspoon more of sea salt",
                    "originalName": "more of sea salt",
                    "amount": 0.25,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.25,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 1077,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "milk.png",
                    "consitency": "liquid",
                    "name": "whole milk",
                    "original": "½ cup whole milk",
                    "originalString": "½ cup whole milk",
                    "originalName": "whole milk",
                    "amount": 0.5,
                    "unit": "cup",
                    "meta": [
                        "whole"
                    ],
                    "metaInformation": [
                        "whole"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 118.294,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1077,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "milk.png",
                    "consitency": "liquid",
                    "name": "whole milk",
                    "original": "3 tablespoons cold whole milk",
                    "originalString": "3 tablespoons cold whole milk",
                    "originalName": "cold whole milk",
                    "amount": 3.0,
                    "unit": "tablespoons",
                    "meta": [
                        "whole",
                        "cold"
                    ],
                    "metaInformation": [
                        "whole",
                        "cold"
                    ],
                    "measures": {
                        "us": {
                            "amount": 3.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 3.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                }
            ],
            "id": 730797,
            "title": "Tomato Tart with Smoked Gruyère and Cracked Black Pepper",
            "readyInMinutes": 75,
            "servings": 8,
            "image": "https://spoonacular.com/recipeImages/730797-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [],
            "occasions": [],
            "winePairing": {},
            "instructions": "To make the tart shell, place flour, nuts, Parmesan and salt into a food processor. Blend on high for 30 seconds until nuts are finely chopped. Add chunks of cold butter, making sure they dont touch each other and pulse until mixture is crumbly.Drizzle in cold milk evenly over mixture and pulse until dough comes together.Place dough on counter and form into a ball, flattened to 1  inches thick.Wrap in plastic and refrigerate 20-30 minutes while you work on tart filling. Dough should be cold but still pliable.To make filling, core and slice tomatoes  inch thick either by hand or with a mandolin. You will need 10 slices which may not use all of the tomatoes.Lay paper towels over a sheet pan, lay the tomato slices over the paper towels and then more paper towels over that. Press down slightly so that the liquid gets absorbed into the paper towels. Let sit 15 minutes.While tomatoes are drying, preheat oven to 325 degrees F and pull dough from the refrigerator and place on a floured surface.Sprinkle the top with flour and roll to a 12 inch circle.Carefully roll back onto rolling pin and then unroll over an 11 inch tart pan. Mold into bottom and sides and cut off any access by running rolling pin across top and letting excess dough fall off.Place the tart pan with dough into the freezer for 10 minutes.After 10 minutes, line the dough with foil and pour in pie weights or dry kidney beans and bake for 20 minutes on a sheet tray until dough is pale yellow at the edges.Remove from oven, cool for 10 minutes then remove foil and weights. Set aside to cool.Increase oven to 375 degrees F.In a medium bowl, place egg and egg yolks and whisk vigorously.Add cream, milk and salt and whisk to incorporate. Set aside.Line the cooled tart shell with the grated cheese.Top with sliced tomatoes arranging them around in a circle slightly overlapping.Pour in the custard and push the tomatoes slices under the surface of the custard.Sprinkle the additional salt and the pepper over the top of the tart.Bake for 40 minutes and check for doneness by inserting the blade of a paring knife into the custard and if it comes out clean, remove tart from oven. If not, bake for five more minutes or until done and golden brown.Let cool for 15 minutes before slicing.Best served warm or hot.Note: Tart can be made ahead and left at room temperature for no more than four hours. Place back in 375 degree F oven for 6-8 minutes to reheat. Dough will get soggy once refrigerated.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "To make the tart shell, place flour, nuts, Parmesan and salt into a food processor. Blend on high for 30 seconds until nuts are finely chopped.",
                            "ingredients": [
                                {
                                    "id": 1033,
                                    "name": "parmesan",
                                    "image": "parmesan.jpg"
                                },
                                {
                                    "id": 20081,
                                    "name": "all purpose flour",
                                    "image": "flour.png"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404771,
                                    "name": "food processor",
                                    "image": "food-processor.png"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Add chunks of cold butter, making sure they dont touch each other and pulse until mixture is crumbly.",
                            "ingredients": [
                                {
                                    "id": 1001,
                                    "name": "butter",
                                    "image": "butter-sliced.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Drizzle in cold milk evenly over mixture and pulse until dough comes together.",
                            "ingredients": [
                                {
                                    "id": 1077,
                                    "name": "milk",
                                    "image": "milk.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "Place dough on counter and form into a ball, flattened to 1  inches thick.Wrap in plastic and refrigerate 20-30 minutes while you work on tart filling. Dough should be cold but still pliable.To make filling, core and slice tomatoes  inch thick either by hand or with a mandolin. You will need 10 slices which may not use all of the tomatoes.Lay paper towels over a sheet pan, lay the tomato slices over the paper towels and then more paper towels over that. Press down slightly so that the liquid gets absorbed into the paper towels.",
                            "ingredients": [
                                {
                                    "id": 10511529,
                                    "name": "tomato slices",
                                    "image": "sliced-tomato.jpg"
                                },
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "image": "tomato.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 405895,
                                    "name": "paper towels",
                                    "image": "paper-towels.jpg"
                                },
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                }
                            ],
                            "length": {
                                "number": 30,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 5,
                            "step": "Let sit 15 minutes.While tomatoes are drying, preheat oven to 325 degrees F and pull dough from the refrigerator and place on a floured surface.Sprinkle the top with flour and roll to a 12 inch circle.Carefully roll back onto rolling pin and then unroll over an 11 inch tart pan. Mold into bottom and sides and cut off any access by running rolling pin across top and letting excess dough fall off.",
                            "ingredients": [
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "image": "tomato.png"
                                },
                                {
                                    "id": 20081,
                                    "name": "all purpose flour",
                                    "image": "flour.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404746,
                                    "name": "rolling pin",
                                    "image": "rolling-pin.jpg"
                                },
                                {
                                    "id": 406922,
                                    "name": "tart form",
                                    "image": "tart-pan.jpg"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 325.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ],
                            "length": {
                                "number": 15,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 6,
                            "step": "Place the tart pan with dough into the freezer for 10 minutes.After 10 minutes, line the dough with foil and pour in pie weights or dry kidney beans and bake for 20 minutes on a sheet tray until dough is pale yellow at the edges.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 406922,
                                    "name": "tart form",
                                    "image": "tart-pan.jpg"
                                },
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                }
                            ],
                            "length": {
                                "number": 40,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 7,
                            "step": "Remove from oven, cool for 10 minutes then remove foil and weights. Set aside to cool.Increase oven to 375 degrees F.In a medium bowl, place egg and egg yolks and whisk vigorously.",
                            "ingredients": [
                                {
                                    "id": 1125,
                                    "name": "egg yolk",
                                    "image": "egg-yolk.jpg"
                                },
                                {
                                    "id": 1123,
                                    "name": "egg",
                                    "image": "egg.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404661,
                                    "name": "whisk",
                                    "image": "whisk.png"
                                },
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                },
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 375.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ],
                            "length": {
                                "number": 10,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 8,
                            "step": "Add cream, milk and salt and whisk to incorporate. Set aside.Line the cooled tart shell with the grated cheese.Top with sliced tomatoes arranging them around in a circle slightly overlapping.",
                            "ingredients": [
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "image": "tomato.png"
                                },
                                {
                                    "id": 1053,
                                    "name": "cream",
                                    "image": "fluid-cream.jpg"
                                },
                                {
                                    "id": 1077,
                                    "name": "milk",
                                    "image": "milk.png"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404661,
                                    "name": "whisk",
                                    "image": "whisk.png"
                                }
                            ]
                        },
                        {
                            "number": 9,
                            "step": "Pour in the custard and push the tomatoes slices under the surface of the custard.Sprinkle the additional salt and the pepper over the top of the tart.",
                            "ingredients": [
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "image": "tomato.png"
                                },
                                {
                                    "id": 1002030,
                                    "name": "pepper",
                                    "image": "pepper.jpg"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 10,
                            "step": "Bake for 40 minutes and check for doneness by inserting the blade of a paring knife into the custard and if it comes out clean, remove tart from oven. If not, bake for five more minutes or until done and golden brown.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404745,
                                    "name": "knife",
                                    "image": "chefs-knife.jpg"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg"
                                }
                            ],
                            "length": {
                                "number": 45,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 11,
                            "step": "Let cool for 15 minutes before slicing.Best served warm or hot.Note: Tart can be made ahead and left at room temperature for no more than four hours.",
                            "ingredients": [],
                            "equipment": [],
                            "length": {
                                "number": 15,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 12,
                            "step": "Place back in 375 degree F oven for 6-8 minutes to reheat. Dough will get soggy once refrigerated.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 375.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ],
                            "length": {
                                "number": 8,
                                "unit": "minutes"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": true,
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 56,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "preparationMinutes": 30,
            "cookingMinutes": 50,
            "sourceUrl": "http://allrecipes.com/Recipe/Ukrainian-Country-Babka/",
            "spoonacularSourceUrl": "https://spoonacular.com/ukrainian-country-babka-447547",
            "aggregateLikes": 18,
            "spoonacularScore": 68.0,
            "healthScore": 18.0,
            "creditsText": "Allrecipes",
            "sourceName": "Allrecipes",
            "pricePerServing": 197.19,
            "extendedIngredients": [
                {
                    "id": 18375,
                    "aisle": "Baking",
                    "image": "yeast-granules.jpg",
                    "consitency": "solid",
                    "name": "active yeast",
                    "original": "2 (0.25 ounce) packages active dry yeast",
                    "originalString": "2 (0.25 ounce) packages active dry yeast",
                    "originalName": "packages active dry yeast",
                    "amount": 0.5,
                    "unit": "ounce",
                    "meta": [
                        "dry"
                    ],
                    "metaInformation": [
                        "dry"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 14.175,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 10120129,
                    "aisle": "Baking",
                    "image": "flour.png",
                    "consitency": "solid",
                    "name": "bread flour",
                    "original": "5 1/2 cups bread flour",
                    "originalString": "5 1/2 cups bread flour",
                    "originalName": "bread flour",
                    "amount": 5.5,
                    "unit": "cups",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 5.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 1.301,
                            "unitShort": "l",
                            "unitLong": "liters"
                        }
                    }
                },
                {
                    "id": 1001,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "butter-sliced.jpg",
                    "consitency": "solid",
                    "name": "butter",
                    "original": "1 cup butter, melted",
                    "originalString": "1 cup butter, melted",
                    "originalName": "butter, melted",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "melted"
                    ],
                    "metaInformation": [
                        "melted"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1123,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "egg.png",
                    "consitency": "solid",
                    "name": "eggs",
                    "original": "6 eggs",
                    "originalString": "6 eggs",
                    "originalName": "eggs",
                    "amount": 6.0,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 6.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 20081,
                    "aisle": "Baking",
                    "image": "flour.png",
                    "consitency": "solid",
                    "name": "flour",
                    "original": "1 cup all-purpose flour",
                    "originalString": "1 cup all-purpose flour",
                    "originalName": "all-purpose flour",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "all-purpose"
                    ],
                    "metaInformation": [
                        "all-purpose"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 9156,
                    "aisle": "Produce",
                    "image": "zest-lemon.jpg",
                    "consitency": "solid",
                    "name": "lemon zest",
                    "original": "2 tablespoons lemon zest",
                    "originalString": "2 tablespoons lemon zest",
                    "originalName": "lemon zest",
                    "amount": 2.0,
                    "unit": "tablespoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 1077,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "milk.png",
                    "consitency": "liquid",
                    "name": "milk",
                    "original": "1 cup milk, scalded and cooled",
                    "originalString": "1 cup milk, scalded and cooled",
                    "originalName": "milk, scalded and cooled",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "cooled"
                    ],
                    "metaInformation": [
                        "cooled"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 9299,
                    "aisle": "Dried Fruits;Produce;Baking",
                    "image": "raisins.jpg",
                    "consitency": "solid",
                    "name": "raisins",
                    "original": "1 cup raisins",
                    "originalString": "1 cup raisins",
                    "originalName": "raisins",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 2047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consitency": "solid",
                    "name": "salt",
                    "original": "1 teaspoon salt",
                    "originalString": "1 teaspoon salt",
                    "originalName": "salt",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 14412,
                    "aisle": "Beverages",
                    "image": "water.png",
                    "consitency": "liquid",
                    "name": "water",
                    "original": "1/2 cup lukewarm water",
                    "originalString": "1/2 cup lukewarm water",
                    "originalName": "lukewarm water",
                    "amount": 0.5,
                    "unit": "cup",
                    "meta": [
                        "lukewarm"
                    ],
                    "metaInformation": [
                        "lukewarm"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 118.294,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 19335,
                    "aisle": "Baking",
                    "image": "sugar-in-bowl.png",
                    "consitency": "solid",
                    "name": "white sugar",
                    "original": "1 cup white sugar",
                    "originalString": "1 cup white sugar",
                    "originalName": "white sugar",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "white"
                    ],
                    "metaInformation": [
                        "white"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                }
            ],
            "id": 447547,
            "title": "Ukrainian Country Babka",
            "readyInMinutes": 80,
            "servings": 4,
            "image": "https://spoonacular.com/recipeImages/447547-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "lacto ovo vegetarian"
            ],
            "occasions": [
                "easter"
            ],
            "winePairing": {},
            "instructions": "In a small bowl, combine 2 teaspoons sugar, 1/2 cup water, yeast, milk and 1 cup flour. Mix until well blended, then cover and allow to rise in a warm place until light and bubbly, about 30 minutes.                            In a large bowl, beat the eggs, salt and 1 cup white sugar until light and fluffy. Stir in the melted butter and lemon zest. Stir in the sponge, then gradually mix in the flour. Knead in the bowl for about 10 minutes, then knead in the raisins. Cover and let rise in a warm place until doubled in volume.                            Punch down dough and knead for a couple of turns then let it rise again. Grease 4 smaller coffee cans with soft butter. Fill the prepared pans about 1/3 full and let rise until the dough is even with the rim. Preheat the oven to 400 degrees F (200 degrees C).                            Bake for 15 minutes in the preheated oven, then turn down the temperature to 350 degrees F (175 degrees C). Continue baking the bread for another 40 minutes. Avoid letting the top get too brown, if it begins to brown too quickly, cover the top with aluminum foil. Remove baked loaves from the pans and cool on a wire rack.                                                Kitchen-Friendly View",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "In a small bowl, combine 2 teaspoons sugar, 1/2 cup water, yeast, milk and 1 cup flour.",
                            "ingredients": [
                                {
                                    "id": 20081,
                                    "name": "all purpose flour",
                                    "image": "flour.png"
                                },
                                {
                                    "id": 19335,
                                    "name": "sugar",
                                    "image": "sugar-in-bowl.png"
                                },
                                {
                                    "id": 14412,
                                    "name": "water",
                                    "image": "water.png"
                                },
                                {
                                    "id": 18375,
                                    "name": "yeast",
                                    "image": "yeast-granules.jpg"
                                },
                                {
                                    "id": 1077,
                                    "name": "milk",
                                    "image": "milk.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Mix until well blended, then cover and allow to rise in a warm place until light and bubbly, about 30 minutes.",
                            "ingredients": [],
                            "equipment": [],
                            "length": {
                                "number": 30,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 3,
                            "step": "In a large bowl, beat the eggs, salt and 1 cup white sugar until light and fluffy. Stir in the melted butter and lemon zest. Stir in the sponge, then gradually mix in the flour. Knead in the bowl for about 10 minutes, then knead in the raisins. Cover and let rise in a warm place until doubled in volume.",
                            "ingredients": [
                                {
                                    "id": 19335,
                                    "name": "granulated sugar",
                                    "image": "sugar-in-bowl.png"
                                },
                                {
                                    "id": 9156,
                                    "name": "lemon zest",
                                    "image": "zest-lemon.jpg"
                                },
                                {
                                    "id": 9299,
                                    "name": "raisins",
                                    "image": "raisins.jpg"
                                },
                                {
                                    "id": 1001,
                                    "name": "butter",
                                    "image": "butter-sliced.jpg"
                                },
                                {
                                    "id": 20081,
                                    "name": "all purpose flour",
                                    "image": "flour.png"
                                },
                                {
                                    "id": 1123,
                                    "name": "egg",
                                    "image": "egg.png"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ],
                            "length": {
                                "number": 10,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 4,
                            "step": "Punch down dough and knead for a couple of turns then let it rise again. Grease 4 smaller coffee cans with soft butter. Fill the prepared pans about 1/3 full and let rise until the dough is even with the rim. Preheat the oven to 400 degrees F (200 degrees C).",
                            "ingredients": [
                                {
                                    "id": 1001,
                                    "name": "butter",
                                    "image": "butter-sliced.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 400.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ]
                        },
                        {
                            "number": 5,
                            "step": "Bake for 15 minutes in the preheated oven, then turn down the temperature to 350 degrees F (175 degrees C). Continue baking the bread for another 40 minutes. Avoid letting the top get too brown, if it begins to brown too quickly, cover the top with aluminum foil.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 350.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ],
                            "length": {
                                "number": 55,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 6,
                            "step": "Remove baked loaves from the pans and cool on a wire rack.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 405900,
                                    "name": "wire rack",
                                    "image": "wire-rack.jpg"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 22,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "sourceUrl": "http://www.seriouseats.com/recipes/2011/09/pork-paillards-with-orange-marmalade-vinaigrette-recipe.html",
            "spoonacularSourceUrl": "https://spoonacular.com/dinner-tonight-pork-paillards-with-orange-marmalade-vinaigrette-206153",
            "aggregateLikes": 28,
            "spoonacularScore": 70.0,
            "healthScore": 16.0,
            "creditsText": "Serious Eats",
            "sourceName": "Serious Eats",
            "pricePerServing": 196.33,
            "extendedIngredients": [
                {
                    "id": 2048,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "apple-cider-vinegar.jpg",
                    "consitency": "liquid",
                    "name": "apple cider vinegar",
                    "original": "2 teaspoons apple cider vinegar",
                    "originalString": "2 teaspoons apple cider vinegar",
                    "originalName": "apple cider vinegar",
                    "amount": 2.0,
                    "unit": "teaspoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 4582,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "vegetable-oil.jpg",
                    "consitency": "liquid",
                    "name": "canola oil",
                    "original": "1/3 cup canola oil",
                    "originalString": "1/3 cup canola oil",
                    "originalName": "canola oil",
                    "amount": 0.3333333333333333,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.333,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 78.863,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1053,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "fluid-cream.jpg",
                    "consitency": "liquid",
                    "name": "heavy cream",
                    "original": "2 teaspoons heavy cream",
                    "originalString": "2 teaspoons heavy cream",
                    "originalName": "heavy cream",
                    "amount": 2.0,
                    "unit": "teaspoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "2/3 cup olive oil",
                    "originalString": "2/3 cup olive oil",
                    "originalName": "olive oil",
                    "amount": 0.6666666666666666,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.667,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 157.725,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 9206,
                    "aisle": "Beverages",
                    "image": "orange-juice.jpg",
                    "consitency": "liquid",
                    "name": "orange juice",
                    "original": "1/2 cup orange juice (about 1 juicing orange)",
                    "originalString": "1/2 cup orange juice (about 1 juicing orange)",
                    "originalName": "orange juice (about 1 juicing orange)",
                    "amount": 0.5,
                    "unit": "cup",
                    "meta": [
                        "( 1 juicing orange)"
                    ],
                    "metaInformation": [
                        "( 1 juicing orange)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 118.294,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 19303,
                    "aisle": "Nut butters, Jams, and Honey",
                    "image": "orange-marmalade.jpg",
                    "consitency": "solid",
                    "name": "orange marmalade",
                    "original": "2 tablespoons orange marmalade",
                    "originalString": "2 tablespoons orange marmalade",
                    "originalName": "orange marmalade",
                    "amount": 2.0,
                    "unit": "tablespoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 10010062,
                    "aisle": "Meat",
                    "image": "pork-chops.jpg",
                    "consitency": "solid",
                    "name": "pork chops",
                    "original": "1 pound boneless pork chops (about 2 chops)",
                    "originalString": "1 pound boneless pork chops (about 2 chops)",
                    "originalName": "boneless pork chops (about 2 chops)",
                    "amount": 1.0,
                    "unit": "pound",
                    "meta": [
                        "boneless",
                        "( 2 chops)"
                    ],
                    "metaInformation": [
                        "boneless",
                        "( 2 chops)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "lb",
                            "unitLong": "pound"
                        },
                        "metric": {
                            "amount": 453.592,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 1102047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt-and-pepper.jpg",
                    "consitency": "solid",
                    "name": "salt and pepper",
                    "original": "Salt and pepper to taste",
                    "originalString": "Salt and pepper to taste",
                    "originalName": "Salt and pepper to taste",
                    "amount": 4.0,
                    "unit": "servings",
                    "meta": [
                        "to taste"
                    ],
                    "metaInformation": [
                        "to taste"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 4.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 11291,
                    "aisle": "Produce",
                    "image": "spring-onions.jpg",
                    "consitency": "solid",
                    "name": "scallions",
                    "original": "2 bunches scallions, ends and roots trimmed, left whole",
                    "originalString": "2 bunches scallions, ends and roots trimmed, left whole",
                    "originalName": "scallions, ends and roots trimmed, left whole",
                    "amount": 2.0,
                    "unit": "bunches",
                    "meta": [
                        "whole",
                        "trimmed"
                    ],
                    "metaInformation": [
                        "whole",
                        "trimmed"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "bunches",
                            "unitLong": "bunches"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "bunches",
                            "unitLong": "bunches"
                        }
                    }
                }
            ],
            "id": 206153,
            "title": "Dinner Tonight: Pork Paillards with Orange Marmalade Vinaigrette",
            "readyInMinutes": 45,
            "servings": 4,
            "image": "https://spoonacular.com/recipeImages/206153-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free"
            ],
            "occasions": [],
            "winePairing": {},
            "instructions": "Procedures                                                                              1                                                                            With a sharp knife, slice the chops in half horizontally to make 4 1/2-inch-thick chops.  Rub each with a little olive oil, sandwich between wax paper, parchment paper, or plastic wrap, and pound with a meat mallet or rolling pin until 1/4-inch thick.  Season the chops with salt and pepper and set aside.                                                                                                                            2                                                                            In a small bowl, whisk together the orange juice, vinegar and cream.  Whisk in the marmalade, then add the oil in a slow stream at first while whisking constantly to create a smooth dressing.  Continue whisking in the rest of the oil, taste for seasoning, and set aside.                                                                                                                            3                                                                            Prepare a grill or heat a grill pan over high heat. Rub the scallions with olive oil and grill until charred and soft, 3 to 5 minutes.  Remove to a platter and add the pork to the grill; cook until well-marked and firm, 3 to 4 minutes on each side.  Transfer to a platter to rest for a moment.                                                                                                                            4                                                                            Drizzle the pork and onions with the vinaigrette, and serve immediately.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "With a sharp knife, slice the chops in half horizontally to make 4 1/2-inch-thick chops.  Rub each with a little olive oil, sandwich between wax paper, parchment paper, or plastic wrap, and pound with a meat mallet or rolling pin until 1/4-inch thick.  Season the chops with salt and pepper and set aside.",
                            "ingredients": [
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "image": "olive-oil.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404770,
                                    "name": "baking paper",
                                    "image": "baking-paper.jpg"
                                },
                                {
                                    "id": 404730,
                                    "name": "plastic wrap",
                                    "image": "plastic-wrap.jpg"
                                },
                                {
                                    "id": 3846,
                                    "name": "meat tenderizer",
                                    "image": "meat-mallet.jpg"
                                },
                                {
                                    "id": 404746,
                                    "name": "rolling pin",
                                    "image": "rolling-pin.jpg"
                                },
                                {
                                    "id": 404739,
                                    "name": "wax paper",
                                    "image": "https://spoonacular.com/cdn/ingredients_100x100/wax-paper.jpg"
                                },
                                {
                                    "id": 404745,
                                    "name": "knife",
                                    "image": "chefs-knife.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "In a small bowl, whisk together the orange juice, vinegar and cream.",
                            "ingredients": [
                                {
                                    "id": 9206,
                                    "name": "orange juice",
                                    "image": "orange-juice.jpg"
                                },
                                {
                                    "id": 1053,
                                    "name": "cream",
                                    "image": "fluid-cream.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404661,
                                    "name": "whisk",
                                    "image": "whisk.png"
                                },
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 3,
                            "step": "Whisk in the marmalade, then add the oil in a slow stream at first while whisking constantly to create a smooth dressing.  Continue whisking in the rest of the oil, taste for seasoning, and set aside.",
                            "ingredients": [
                                {
                                    "id": 4582,
                                    "name": "cooking oil",
                                    "image": "vegetable-oil.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404661,
                                    "name": "whisk",
                                    "image": "whisk.png"
                                }
                            ]
                        },
                        {
                            "number": 4,
                            "step": "Prepare a grill or heat a grill pan over high heat. Rub the scallions with olive oil and grill until charred and soft, 3 to 5 minutes.",
                            "ingredients": [
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "image": "olive-oil.jpg"
                                },
                                {
                                    "id": 11291,
                                    "name": "green onions",
                                    "image": "spring-onions.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404648,
                                    "name": "grill pan",
                                    "image": "grill-pan.jpg"
                                },
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                }
                            ],
                            "length": {
                                "number": 3,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 5,
                            "step": "Remove to a platter and add the pork to the grill; cook until well-marked and firm, 3 to 4 minutes on each side.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                }
                            ],
                            "length": {
                                "number": 3,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 6,
                            "step": "Transfer to a platter to rest for a moment.",
                            "ingredients": [],
                            "equipment": []
                        },
                        {
                            "number": 7,
                            "step": "Drizzle the pork and onions with the vinaigrette, and serve immediately.",
                            "ingredients": [],
                            "equipment": []
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 27,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "sourceUrl": "http://www.melskitchencafe.com/mexican-lasagna/",
            "spoonacularSourceUrl": "https://spoonacular.com/mexican-lasagna-568779",
            "aggregateLikes": 13,
            "spoonacularScore": 89.0,
            "healthScore": 40.0,
            "creditsText": "Mels Kitchen Café",
            "sourceName": "Mels Kitchen Café",
            "pricePerServing": 433.39,
            "extendedIngredients": [
                {
                    "id": 16018,
                    "aisle": "Canned and Jarred",
                    "image": "black-beans.jpg",
                    "consitency": "solid",
                    "name": "canned black beans",
                    "original": "1 (15 ounce) can black beans, rinsed and drained",
                    "originalString": "1 (15 ounce) can black beans, rinsed and drained",
                    "originalName": "black beans, rinsed and drained",
                    "amount": 15.0,
                    "unit": "ounce",
                    "meta": [
                        "rinsed",
                        "drained",
                        "canned"
                    ],
                    "metaInformation": [
                        "rinsed",
                        "drained",
                        "canned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 15.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 425.243,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 11549,
                    "aisle": "Pasta and Rice",
                    "image": "tomato-sauce-or-pasta-sauce.jpg",
                    "consitency": "solid",
                    "name": "canned tomato sauce",
                    "original": "3 (8 ounce) cans tomato sauce",
                    "originalString": "3 (8 ounce) cans tomato sauce",
                    "originalName": "tomato sauce",
                    "amount": 24.0,
                    "unit": "ounce",
                    "meta": [
                        "canned"
                    ],
                    "metaInformation": [
                        "canned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 24.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 680.389,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 10011693,
                    "aisle": "Canned and Jarred",
                    "image": "tomatoes-canned.png",
                    "consitency": "solid",
                    "name": "canned tomatoes",
                    "original": "1 (14.5 ounce) can diced tomatoes, drained",
                    "originalString": "1 (14.5 ounce) can diced tomatoes, drained",
                    "originalName": "diced tomatoes, drained",
                    "amount": 14.5,
                    "unit": "ounce",
                    "meta": [
                        "diced",
                        "drained",
                        "canned"
                    ],
                    "metaInformation": [
                        "diced",
                        "drained",
                        "canned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 14.5,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 411.068,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 2009,
                    "aisle": "Spices and Seasonings",
                    "image": "chili-powder.jpg",
                    "consitency": "solid",
                    "name": "chili powder",
                    "original": "1 tablespoon chili powder",
                    "originalString": "1 tablespoon chili powder",
                    "originalName": "chili powder",
                    "amount": 1.0,
                    "unit": "tablespoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 11172,
                    "aisle": "Produce",
                    "image": "corn.png",
                    "consitency": "solid",
                    "name": "corn kernels",
                    "original": "1 ½ cup frozen corn kernels, white or yellow",
                    "originalString": "1 ½ cup frozen corn kernels, white or yellow",
                    "originalName": "frozen corn kernels, white or yellow",
                    "amount": 1.5,
                    "unit": "cup",
                    "meta": [
                        "white",
                        "yellow",
                        "frozen"
                    ],
                    "metaInformation": [
                        "white",
                        "yellow",
                        "frozen"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 354.882,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 11215,
                    "aisle": "Produce",
                    "image": "garlic.jpg",
                    "consitency": "solid",
                    "name": "garlic cloves",
                    "original": "2 garlic cloves, finely minced",
                    "originalString": "2 garlic cloves, finely minced",
                    "originalName": "garlic cloves, finely minced",
                    "amount": 2.0,
                    "unit": "",
                    "meta": [
                        "finely minced"
                    ],
                    "metaInformation": [
                        "finely minced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 2031,
                    "aisle": "Spices and Seasonings",
                    "image": "chili-powder.jpg",
                    "consitency": "solid",
                    "name": "ground cayenne pepper",
                    "original": "dash of ground cayenne pepper",
                    "originalString": "dash of ground cayenne pepper",
                    "originalName": "ground cayenne pepper",
                    "amount": 1.0,
                    "unit": "dash",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "dash",
                            "unitLong": "dash"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "dash",
                            "unitLong": "dash"
                        }
                    }
                },
                {
                    "id": 1002014,
                    "aisle": "Spices and Seasonings",
                    "image": "ground-cumin.jpg",
                    "consitency": "solid",
                    "name": "ground cumin",
                    "original": "2 teaspoons ground cumin",
                    "originalString": "2 teaspoons ground cumin",
                    "originalName": "ground cumin",
                    "amount": 2.0,
                    "unit": "teaspoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 23557,
                    "aisle": "Meat",
                    "image": "fresh-ground-beef.jpg",
                    "consitency": "solid",
                    "name": "lean ground beef",
                    "original": "1 1/2 pounds lean ground beef or turkey",
                    "originalString": "1 1/2 pounds lean ground beef or turkey",
                    "originalName": "lean ground beef or turkey",
                    "amount": 1.5,
                    "unit": "pounds",
                    "meta": [
                        "lean"
                    ],
                    "metaInformation": [
                        "lean"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.5,
                            "unitShort": "lb",
                            "unitLong": "pounds"
                        },
                        "metric": {
                            "amount": 680.389,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 43274,
                    "aisle": "Cheese",
                    "image": "cream-cheese.jpg",
                    "consitency": "solid",
                    "name": "light cream cheese",
                    "original": "8 ounces cream cheese, light or regular",
                    "originalString": "8 ounces cream cheese, light or regular",
                    "originalName": "cream cheese, light or regular",
                    "amount": 8.0,
                    "unit": "ounces",
                    "meta": [
                        "light"
                    ],
                    "metaInformation": [
                        "light"
                    ],
                    "measures": {
                        "us": {
                            "amount": 8.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 226.796,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 9195,
                    "aisle": "Canned and Jarred",
                    "image": "olives-stuffed.jpg",
                    "consitency": "solid",
                    "name": "olives",
                    "original": "1 (6 ounce) can olives, chopped",
                    "originalString": "1 (6 ounce) can olives, chopped",
                    "originalName": "olives, chopped",
                    "amount": 6.0,
                    "unit": "ounce",
                    "meta": [
                        "chopped",
                        "canned"
                    ],
                    "metaInformation": [
                        "chopped",
                        "canned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 170.097,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 2027,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "oregano.jpg",
                    "consitency": "solid",
                    "name": "oregano",
                    "original": "1 teaspoon dried oregano",
                    "originalString": "1 teaspoon dried oregano",
                    "originalName": "dried oregano",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [
                        "dried"
                    ],
                    "metaInformation": [
                        "dried"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 10620420,
                    "aisle": "Pasta and Rice",
                    "image": "lasagna-noodles.jpg",
                    "consitency": "solid",
                    "name": "packaged no-boil lasagna noodles",
                    "original": "9-12 no-boil lasagna noodles (I love the Barilla brand), or boil and drain regular lasagna noodles",
                    "originalString": "9-12 no-boil lasagna noodles (I love the Barilla brand), or boil and drain regular lasagna noodles",
                    "originalName": "no-boil lasagna noodles (I love the Barilla brand), or boil and drain regular lasagna noodles",
                    "amount": 9.0,
                    "unit": "",
                    "meta": [
                        "(I love the Barilla brand)"
                    ],
                    "metaInformation": [
                        "(I love the Barilla brand)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 9.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 9.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 1002030,
                    "aisle": "Spices and Seasonings",
                    "image": "pepper.jpg",
                    "consitency": "solid",
                    "name": "pepper",
                    "original": "1/2 teaspoon pepper",
                    "originalString": "1/2 teaspoon pepper",
                    "originalName": "pepper",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 2047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consitency": "solid",
                    "name": "salt",
                    "original": "1/2 teaspoon salt",
                    "originalString": "1/2 teaspoon salt",
                    "originalName": "salt",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 1001009,
                    "aisle": "Cheese",
                    "image": "shredded-cheddar.jpg",
                    "consitency": "solid",
                    "name": "shredded cheddar cheese",
                    "original": "1 cup shredded cheddar cheese",
                    "originalString": "1 cup shredded cheddar cheese",
                    "originalName": "shredded cheddar cheese",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "shredded"
                    ],
                    "metaInformation": [
                        "shredded"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1001026,
                    "aisle": "Cheese",
                    "image": "shredded-cheese-white.jpg",
                    "consitency": "solid",
                    "name": "shredded mozzarella cheese",
                    "original": "2 cups shredded mozzarella cheese",
                    "originalString": "2 cups shredded mozzarella cheese",
                    "originalName": "shredded mozzarella cheese",
                    "amount": 2.0,
                    "unit": "cups",
                    "meta": [
                        "shredded"
                    ],
                    "metaInformation": [
                        "shredded"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 473.176,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1056,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "sour-cream.jpg",
                    "consitency": "solid",
                    "name": "sour cream",
                    "original": "1 cup sour cream, light or regular",
                    "originalString": "1 cup sour cream, light or regular",
                    "originalName": "sour cream, light or regular",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "light",
                        "sour"
                    ],
                    "metaInformation": [
                        "light",
                        "sour"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 11887,
                    "aisle": "Pasta and Rice",
                    "image": "tomato-paste.jpg",
                    "consitency": "solid",
                    "name": "tomato paste",
                    "original": "1 (6 ounce) can tomato paste",
                    "originalString": "1 (6 ounce) can tomato paste",
                    "originalName": "tomato paste",
                    "amount": 6.0,
                    "unit": "ounce",
                    "meta": [
                        "canned"
                    ],
                    "metaInformation": [
                        "canned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 170.097,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 10511282,
                    "aisle": "Produce",
                    "image": "brown-onion.png",
                    "consitency": "solid",
                    "name": "yellow onion",
                    "original": "1 yellow onion, coarsely chopped",
                    "originalString": "1 yellow onion, coarsely chopped",
                    "originalName": "yellow onion, coarsely chopped",
                    "amount": 1.0,
                    "unit": "",
                    "meta": [
                        "yellow",
                        "coarsely chopped"
                    ],
                    "metaInformation": [
                        "yellow",
                        "coarsely chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                }
            ],
            "id": 568779,
            "title": "Mexican Lasagna",
            "readyInMinutes": 45,
            "servings": 6,
            "image": "https://spoonacular.com/recipeImages/568779-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [
                "Mediterranean",
                "Italian",
                "Eastern European",
                "European",
                "Greek"
            ],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [],
            "occasions": [],
            "winePairing": {},
            "instructions": "Preheat the oven to 350 degrees. Lightly grease a 9X13-inch pan and set aside.In a large 12-inch skillet, brown the ground beef or turkey and onion over medium heat until the meat is no longer pink. Drain the grease. Add the minced garlic and tomato paste. Stir to combine well and cook for about a minute. Stir in the chili powder, cumin, cayenne, oregano and salt and pepper. Mix well. Add the diced tomatoes and tomato sauce. Stir to combine. Add the black beans, corn and olives. Mix well and heat through, about 5 minutes.Remove the skillet from the heat. Spread 1/2 cup sauce in the bottom of the prepared pan. Layer three (or four, depending on the brand of noodles you use) noodles over the sauce. Spread 1/3 of the sauce over the noodles. Dollop 1/3 of the sour cream and 1/3 of the cream cheese (just pinch off chunks and toss them on top) across the sauce. Sprinkle with 1/3 of the cheeses. Repeat the layers two more times until all the ingredients are used.Cover the lasagna with foil and bake at 350 degrees for 35 minutes. Uncover and bake 10-15 minutes more, until the lasagna is hot and bubbly. Let stand 10 minutes before cutting into and serving.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Preheat the oven to 350 degrees. Lightly grease a 9X13-inch pan and set aside.In a large 12-inch skillet, brown the ground beef or turkey and onion over medium heat until the meat is no longer pink.",
                            "ingredients": [
                                {
                                    "id": 11282,
                                    "name": "onion",
                                    "image": "brown-onion.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Drain the grease.",
                            "ingredients": [],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Add the minced garlic and tomato paste. Stir to combine well and cook for about a minute. Stir in the chili powder, cumin, cayenne, oregano and salt and pepper.",
                            "ingredients": [
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 2009,
                                    "name": "chili powder",
                                    "image": "chili-powder.jpg"
                                },
                                {
                                    "id": 11887,
                                    "name": "tomato paste",
                                    "image": "tomato-paste.jpg"
                                },
                                {
                                    "id": 2031,
                                    "name": "ground cayenne pepper",
                                    "image": "chili-powder.jpg"
                                },
                                {
                                    "id": 2027,
                                    "name": "oregano",
                                    "image": "oregano.jpg"
                                },
                                {
                                    "id": 1002014,
                                    "name": "cumin",
                                    "image": "ground-cumin.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "Mix well.",
                            "ingredients": [],
                            "equipment": []
                        },
                        {
                            "number": 5,
                            "step": "Add the diced tomatoes and tomato sauce. Stir to combine.",
                            "ingredients": [
                                {
                                    "id": 11549,
                                    "name": "tomato sauce",
                                    "image": "tomato-sauce-or-pasta-sauce.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 6,
                            "step": "Add the black beans, corn and olives.",
                            "ingredients": [
                                {
                                    "id": 9195,
                                    "name": "olives",
                                    "image": "olives-mixed.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 7,
                            "step": "Mix well and heat through, about 5 minutes.",
                            "ingredients": [],
                            "equipment": [],
                            "length": {
                                "number": 5,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 8,
                            "step": "Remove the skillet from the heat.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                }
                            ]
                        },
                        {
                            "number": 9,
                            "step": "Spread 1/2 cup sauce in the bottom of the prepared pan. Layer three (or four, depending on the brand of noodles you use) noodles over the sauce.",
                            "ingredients": [
                                {
                                    "id": 20420,
                                    "name": "pasta",
                                    "image": "fusilli.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                }
                            ]
                        },
                        {
                            "number": 10,
                            "step": "Spread 1/3 of the sauce over the noodles. Dollop 1/3 of the sour cream and 1/3 of the cream cheese (just pinch off chunks and toss them on top) across the sauce. Sprinkle with 1/3 of the cheeses. Repeat the layers two more times until all the ingredients are used.Cover the lasagna with foil and bake at 350 degrees for 35 minutes. Uncover and bake 10-15 minutes more, until the lasagna is hot and bubbly.",
                            "ingredients": [
                                {
                                    "id": 1056,
                                    "name": "sour cream",
                                    "image": "sour-cream.jpg"
                                },
                                {
                                    "id": 20420,
                                    "name": "pasta",
                                    "image": "fusilli.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                }
                            ],
                            "length": {
                                "number": 50,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 11,
                            "step": "Let stand 10 minutes before cutting into and serving.",
                            "ingredients": [],
                            "equipment": [],
                            "length": {
                                "number": 10,
                                "unit": "minutes"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": true,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 22,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "sourceUrl": "http://www.mygourmetconnection.com/recipes/main-courses/meatless/wild-mushrooms-creamy-goat-cheese-polenta.php",
            "spoonacularSourceUrl": "https://spoonacular.com/wild-mushroom-medley-with-creamy-goat-cheese-polenta-498929",
            "aggregateLikes": 85,
            "spoonacularScore": 78.0,
            "healthScore": 18.0,
            "creditsText": "My Gourmet Connection",
            "sourceName": "My Gourmet Connection",
            "pricePerServing": 396.99,
            "extendedIngredients": [
                {
                    "id": 1002030,
                    "aisle": "Spices and Seasonings",
                    "image": "pepper.jpg",
                    "consitency": "solid",
                    "name": "black pepper",
                    "original": "1/4 teaspoon freshly ground black pepper",
                    "originalString": "1/4 teaspoon freshly ground black pepper",
                    "originalName": "freshly ground black pepper",
                    "amount": 0.25,
                    "unit": "teaspoon",
                    "meta": [
                        "black",
                        "freshly ground"
                    ],
                    "metaInformation": [
                        "black",
                        "freshly ground"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.25,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 1001,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "butter-sliced.jpg",
                    "consitency": "solid",
                    "name": "butter",
                    "original": "2 tablespoons butter",
                    "originalString": "2 tablespoons butter",
                    "originalName": "butter",
                    "amount": 2.0,
                    "unit": "tablespoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 11260,
                    "aisle": "Produce",
                    "image": "mushrooms.png",
                    "consitency": "solid",
                    "name": "fresh mushrooms",
                    "original": "1-1/2 lbs fresh mushrooms (see notes)",
                    "originalString": "1-1/2 lbs fresh mushrooms (see notes)",
                    "originalName": "fresh mushrooms (see notes)",
                    "amount": 1.0,
                    "unit": "lbs",
                    "meta": [
                        "fresh",
                        "(see notes)"
                    ],
                    "metaInformation": [
                        "fresh",
                        "(see notes)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "lb",
                            "unitLong": "pound"
                        },
                        "metric": {
                            "amount": 453.592,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 99226,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "fresh-sage.png",
                    "consitency": "solid",
                    "name": "fresh sage leaves",
                    "original": "1 tablespoon fresh sage leaves, finely chopped",
                    "originalString": "1 tablespoon fresh sage leaves, finely chopped",
                    "originalName": "fresh sage leaves, finely chopped",
                    "amount": 1.0,
                    "unit": "tablespoon",
                    "meta": [
                        "fresh",
                        "finely chopped"
                    ],
                    "metaInformation": [
                        "fresh",
                        "finely chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 2049,
                    "aisle": "Produce",
                    "image": "thyme.jpg",
                    "consitency": "solid",
                    "name": "fresh thyme leaves",
                    "original": "1 to 2 tablespoons fresh thyme leaves",
                    "originalString": "1 to 2 tablespoons fresh thyme leaves",
                    "originalName": "fresh thyme leaves",
                    "amount": 1.0,
                    "unit": "tablespoons",
                    "meta": [
                        "fresh"
                    ],
                    "metaInformation": [
                        "fresh"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 11215,
                    "aisle": "Produce",
                    "image": "garlic.jpg",
                    "consitency": "solid",
                    "name": "garlic",
                    "original": "1 clove garlic, very finely chopped",
                    "originalString": "1 clove garlic, very finely chopped",
                    "originalName": "garlic, very finely chopped",
                    "amount": 1.0,
                    "unit": "clove",
                    "meta": [
                        "very finely chopped"
                    ],
                    "metaInformation": [
                        "very finely chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "clove",
                            "unitLong": "clove"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "clove",
                            "unitLong": "clove"
                        }
                    }
                },
                {
                    "id": 1159,
                    "aisle": "Cheese",
                    "image": "goat-cheese.jpg",
                    "consitency": "solid",
                    "name": "goat cheese",
                    "original": "4 ounces crumbled goat cheese (about 1 cup)",
                    "originalString": "4 ounces crumbled goat cheese (about 1 cup)",
                    "originalName": "ounces crumbled goat cheese (about",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "crumbled"
                    ],
                    "metaInformation": [
                        "crumbled"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1053,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "fluid-cream.jpg",
                    "consitency": "liquid",
                    "name": "heavy cream",
                    "original": "1/4 cup heavy cream",
                    "originalString": "1/4 cup heavy cream",
                    "originalName": "heavy cream",
                    "amount": 0.25,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 59.147,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 6970,
                    "aisle": "Canned and Jarred",
                    "image": "chicken-broth.png",
                    "consitency": "liquid",
                    "name": "low sodium chicken broth",
                    "original": "1-1/2 cups low-sodium chicken broth",
                    "originalString": "1-1/2 cups low-sodium chicken broth",
                    "originalName": "low-sodium chicken broth",
                    "amount": 1.0,
                    "unit": "cups",
                    "meta": [
                        "low-sodium"
                    ],
                    "metaInformation": [
                        "low-sodium"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1077,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "milk.png",
                    "consitency": "liquid",
                    "name": "milk",
                    "original": "2-1/2 cups milk",
                    "originalString": "2-1/2 cups milk",
                    "originalName": "milk",
                    "amount": 2.0,
                    "unit": "cups",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 473.176,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 11260,
                    "aisle": "Produce",
                    "image": "mushrooms.png",
                    "consitency": "solid",
                    "name": "mushrooms",
                    "original": "1 ounce dried mushrooms (see notes)",
                    "originalString": "1 ounce dried mushrooms (see notes)",
                    "originalName": "dried mushrooms (see notes)",
                    "amount": 1.0,
                    "unit": "ounce",
                    "meta": [
                        "dried",
                        "(see notes)"
                    ],
                    "metaInformation": [
                        "dried",
                        "(see notes)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "oz",
                            "unitLong": "ounce"
                        },
                        "metric": {
                            "amount": 28.35,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "2 tablespoons olive oil",
                    "originalString": "2 tablespoons olive oil",
                    "originalName": "olive oil",
                    "amount": 2.0,
                    "unit": "tablespoons",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 10011282,
                    "aisle": "Produce",
                    "image": "red-onion.png",
                    "consitency": "solid",
                    "name": "red onion",
                    "original": "1 medium red onion, sliced",
                    "originalString": "1 medium red onion, sliced",
                    "originalName": "red onion, sliced",
                    "amount": 1.0,
                    "unit": "medium",
                    "meta": [
                        "red",
                        "sliced"
                    ],
                    "metaInformation": [
                        "red",
                        "sliced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "medium",
                            "unitLong": "medium"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "medium",
                            "unitLong": "medium"
                        }
                    }
                },
                {
                    "id": 2047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consitency": "solid",
                    "name": "salt",
                    "original": "1 teaspoon salt",
                    "originalString": "1 teaspoon salt",
                    "originalName": "salt",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 1102047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt-and-pepper.jpg",
                    "consitency": "solid",
                    "name": "salt and pepper",
                    "original": "Salt and freshly ground black pepper",
                    "originalString": "Salt and freshly ground black pepper",
                    "originalName": "Salt and freshly ground black pepper",
                    "amount": 4.0,
                    "unit": "servings",
                    "meta": [
                        "black",
                        "freshly ground"
                    ],
                    "metaInformation": [
                        "black",
                        "freshly ground"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 4.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 10214106,
                    "aisle": "Alcoholic Beverages",
                    "image": "dry-sherry.png",
                    "consitency": "liquid",
                    "name": "sherry",
                    "original": "1/2 cup sherry (or low-sodium chicken broth)",
                    "originalString": "1/2 cup sherry (or low-sodium chicken broth)",
                    "originalName": "sherry (or low-sodium chicken broth)",
                    "amount": 0.5,
                    "unit": "cup",
                    "meta": [
                        "low-sodium",
                        "(or chicken broth)"
                    ],
                    "metaInformation": [
                        "low-sodium",
                        "(or chicken broth)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 118.294,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 14412,
                    "aisle": "Beverages",
                    "image": "water.png",
                    "consitency": "liquid",
                    "name": "water",
                    "original": "3/4 cup warm water",
                    "originalString": "3/4 cup warm water",
                    "originalName": "warm water",
                    "amount": 0.75,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.75,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 177.441,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 35137,
                    "aisle": "Ethnic Foods;Baking",
                    "image": "cornmeal.png",
                    "consitency": "solid",
                    "name": "yellow cornmeal",
                    "original": "1 cup yellow cornmeal",
                    "originalString": "1 cup yellow cornmeal",
                    "originalName": "yellow cornmeal",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "yellow"
                    ],
                    "metaInformation": [
                        "yellow"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                }
            ],
            "id": 498929,
            "title": "Wild Mushroom Medley with Creamy Goat Cheese Polenta",
            "readyInMinutes": 45,
            "servings": 4,
            "image": "https://spoonacular.com/recipeImages/498929-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free",
                "lacto ovo vegetarian"
            ],
            "occasions": [],
            "winePairing": {},
            "instructions": "Preparation:Clean the mushrooms, trim the stems, and cut them into 1/4-inch slices. Set aside.",
            "analyzedInstructions": []
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": false,
            "veryHealthy": true,
            "cheap": false,
            "veryPopular": true,
            "sustainable": false,
            "weightWatcherSmartPoints": 13,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "preparationMinutes": 10,
            "cookingMinutes": 320,
            "sourceUrl": "https://www.bbcgoodfood.com/recipes/lamb-kleftiko",
            "spoonacularSourceUrl": "https://spoonacular.com/lamb-kleftiko-224127",
            "aggregateLikes": 475,
            "spoonacularScore": 99.0,
            "healthScore": 100.0,
            "creditsText": "BBC Good Food",
            "sourceName": "BBC Good Food",
            "pricePerServing": 563.16,
            "extendedIngredients": [
                {
                    "id": 11215,
                    "aisle": "Produce",
                    "image": "garlic.jpg",
                    "consitency": "solid",
                    "name": "garlic cloves",
                    "original": "6 garlic cloves",
                    "originalString": "6 garlic cloves",
                    "originalName": "garlic cloves",
                    "amount": 6.0,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 6.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 2027,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "oregano.jpg",
                    "consitency": "solid",
                    "name": "oregano",
                    "original": "3 tbsp roughly chopped oregano",
                    "originalString": "3 tbsp roughly chopped oregano",
                    "originalName": "roughly chopped oregano",
                    "amount": 3.0,
                    "unit": "tbsp",
                    "meta": [
                        "roughly chopped"
                    ],
                    "metaInformation": [
                        "roughly chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 3.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 3.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 2036,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "rosemary.jpg",
                    "consitency": "solid",
                    "name": "rosemary",
                    "original": "1 tbsp roughly chopped rosemary",
                    "originalString": "1 tbsp roughly chopped rosemary",
                    "originalName": "roughly chopped rosemary",
                    "amount": 1.0,
                    "unit": "tbsp",
                    "meta": [
                        "roughly chopped"
                    ],
                    "metaInformation": [
                        "roughly chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 9152,
                    "aisle": "Produce",
                    "image": "lemon-juice.jpg",
                    "consitency": "liquid",
                    "name": "juice of lemon",
                    "original": "zest 1 lemon and juice of 2",
                    "originalString": "zest 1 lemon and juice of 2",
                    "originalName": "zest 1 lemon and juice of",
                    "amount": 2.0,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 1012010,
                    "aisle": "Spices and Seasonings",
                    "image": "cinnamon.jpg",
                    "consitency": "solid",
                    "name": "ground cinnamon",
                    "original": "½ tsp ground cinnamon",
                    "originalString": "½ tsp ground cinnamon",
                    "originalName": "ground cinnamon",
                    "amount": 0.5,
                    "unit": "tsp",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "3 tbsp olive oil",
                    "originalString": "3 tbsp olive oil",
                    "originalName": "olive oil",
                    "amount": 3.0,
                    "unit": "tbsp",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 3.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 3.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 17013,
                    "aisle": "Meat",
                    "image": "leg-of-lamb.png",
                    "consitency": "solid",
                    "name": "leg of lamb",
                    "original": "2kg leg of lamb",
                    "originalString": "2kg leg of lamb",
                    "originalName": "leg of lamb",
                    "amount": 2.0,
                    "unit": "kg",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 4.409,
                            "unitShort": "lb",
                            "unitLong": "pounds"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "kg",
                            "unitLong": "kgs"
                        }
                    }
                },
                {
                    "id": 11362,
                    "aisle": "Produce",
                    "image": "potatoes-yukon-gold.png",
                    "consitency": "solid",
                    "name": "potato",
                    "original": "1kg Desiree potato, halved or quartered",
                    "originalString": "1kg Desiree potato, halved or quartered",
                    "originalName": "Desiree potato, halved or quartered",
                    "amount": 1.0,
                    "unit": "kg",
                    "meta": [
                        "halved",
                        "quartered"
                    ],
                    "metaInformation": [
                        "halved",
                        "quartered"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.205,
                            "unitShort": "lb",
                            "unitLong": "pounds"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "kg",
                            "unitLong": "kg"
                        }
                    }
                },
                {
                    "id": 2004,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "bay-leaves.jpg",
                    "consitency": "solid",
                    "name": "bay leaves",
                    "original": "5 bay leaves",
                    "originalString": "5 bay leaves",
                    "originalName": "bay leaves",
                    "amount": 5.0,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 5.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 5.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 1256,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "plain-yogurt.jpg",
                    "consitency": "liquid",
                    "name": "greek yogurt",
                    "original": "250g Greek yogurt",
                    "originalString": "250g Greek yogurt",
                    "originalName": "Greek yogurt",
                    "amount": 250.0,
                    "unit": "g",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 8.818,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 250.0,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 9152,
                    "aisle": "Produce",
                    "image": "lemon-juice.jpg",
                    "consitency": "liquid",
                    "name": "juice of lemon",
                    "original": "juice ½ lemon",
                    "originalString": "juice ½ lemon",
                    "originalName": "juice lemon",
                    "amount": 0.5,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "1 tbsp olive oil",
                    "originalString": "1 tbsp olive oil",
                    "originalName": "olive oil",
                    "amount": 1.0,
                    "unit": "tbsp",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 2064,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "mint.jpg",
                    "consitency": "solid",
                    "name": "mint",
                    "original": "handful mint, shredded",
                    "originalString": "handful mint, shredded",
                    "originalName": "mint, shredded",
                    "amount": 1.0,
                    "unit": "handful",
                    "meta": [
                        "shredded"
                    ],
                    "metaInformation": [
                        "shredded"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "handful",
                            "unitLong": "handful"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "handful",
                            "unitLong": "handful"
                        }
                    }
                },
                {
                    "id": 1022068,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "red-wine-vinegar.jpg",
                    "consitency": "liquid",
                    "name": "red wine vinegar",
                    "original": "1½ tsp red wine vinegar",
                    "originalString": "1½ tsp red wine vinegar",
                    "originalName": "red wine vinegar",
                    "amount": 1.5,
                    "unit": "tsp",
                    "meta": [
                        "red"
                    ],
                    "metaInformation": [
                        "red"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 1.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "1½ tbsp extra-virgin olive oil",
                    "originalString": "1½ tbsp extra-virgin olive oil",
                    "originalName": "extra-virgin olive oil",
                    "amount": 1.5,
                    "unit": "tbsp",
                    "meta": [
                        "extra-virgin"
                    ],
                    "metaInformation": [
                        "extra-virgin"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.5,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 1.5,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 11457,
                    "aisle": "Produce",
                    "image": "spinach.jpg",
                    "consitency": "solid",
                    "name": "baby spinach",
                    "original": "100g baby spinach",
                    "originalString": "100g baby spinach",
                    "originalName": "baby spinach",
                    "amount": 100.0,
                    "unit": "g",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 3.527,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 100.0,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 11297,
                    "aisle": "Produce",
                    "image": "parsley.jpg",
                    "consitency": "solid",
                    "name": "parsley",
                    "original": "small bunch parsley, roughly chopped",
                    "originalString": "small bunch parsley, roughly chopped",
                    "originalName": "parsley, roughly chopped",
                    "amount": 1.0,
                    "unit": "small bunch",
                    "meta": [
                        "roughly chopped"
                    ],
                    "metaInformation": [
                        "roughly chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "small bunch",
                            "unitLong": "small bunch"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "small bunch",
                            "unitLong": "small bunch"
                        }
                    }
                },
                {
                    "id": 10011282,
                    "aisle": "Produce",
                    "image": "red-onion.png",
                    "consitency": "solid",
                    "name": "red onion",
                    "original": "½ red onion, finely sliced",
                    "originalString": "½ red onion, finely sliced",
                    "originalName": "red onion, finely sliced",
                    "amount": 0.5,
                    "unit": "",
                    "meta": [
                        "red",
                        "finely sliced"
                    ],
                    "metaInformation": [
                        "red",
                        "finely sliced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 10311529,
                    "aisle": "Produce",
                    "image": "cherry-tomatoes.png",
                    "consitency": "solid",
                    "name": "cherry tomato",
                    "original": "175g cherry tomato, halved",
                    "originalString": "175g cherry tomato, halved",
                    "originalName": "cherry tomato, halved",
                    "amount": 175.0,
                    "unit": "g",
                    "meta": [
                        "halved"
                    ],
                    "metaInformation": [
                        "halved"
                    ],
                    "measures": {
                        "us": {
                            "amount": 6.173,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 175.0,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 11206,
                    "aisle": "Produce",
                    "image": "cucumber.jpg",
                    "consitency": "solid",
                    "name": "cucumber",
                    "original": "½ cucumber, halved lengthways, deseeded and sliced",
                    "originalString": "½ cucumber, halved lengthways, deseeded and sliced",
                    "originalName": "cucumber, halved lengthways, deseeded and sliced",
                    "amount": 0.5,
                    "unit": "",
                    "meta": [
                        "halved",
                        "deseeded",
                        "sliced"
                    ],
                    "metaInformation": [
                        "halved",
                        "deseeded",
                        "sliced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 1009195,
                    "aisle": "Canned and Jarred",
                    "image": "calamata-or-kalamata-olives.jpg",
                    "consitency": "solid",
                    "name": "kalamata olive",
                    "original": "75g black Kalamata olive, stoned and quartered",
                    "originalString": "75g black Kalamata olive, stoned and quartered",
                    "originalName": "black Kalamata olive, stoned and quartered",
                    "amount": 75.0,
                    "unit": "g",
                    "meta": [
                        "black",
                        "quartered"
                    ],
                    "metaInformation": [
                        "black",
                        "quartered"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.646,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 75.0,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                }
            ],
            "id": 224127,
            "title": "Lamb kleftiko",
            "readyInMinutes": 330,
            "servings": 6,
            "image": "https://spoonacular.com/recipeImages/224127-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free"
            ],
            "occasions": [],
            "winePairing": {},
            "instructions": "Crush together the garlic cloves and 1 tsp salt using a pestle and mortar. Add the herbs, lemon zest, cinnamon, some black pepper, crush a little more, then stir through 2 tbsp of the olive oil.\nUsing a sharp knife, create lots of holes all over the lamb, and rub in the paste, pushing it deep into the holes. Transfer the lamb to a large food bag, pour in the lemon juice and marinate overnight.\nThe next day, take the lamb out of the fridge 1 hr before you want to cook it. Heat oven to 160C/140C fan/gas 3.\nLay 2 long pieces of baking parchment on top of 2 long pieces of foil  one widthways, the other lengthways to form a cross. Pop the potatoes in the centre of the parchment and toss with the remaining oil and some seasoning. Bring up the sides of the foil, then pour the marinade from the lamb over the potatoes and throw in the bay leaves. \nSet the lamb on top of the potatoes and scrunch the foil together tightly to completely enclose the lamb. Lift into a roasting tin and roast in the oven for 4 hrs until very tender.\nRemove tin from the oven and increase the temperature to 220C/200C fan/gas 7. Unwrap the parcel and scrunch the foil and parchment under the rim of the tin, baste the lamb with the juices and return to the oven for a further 20 mins until browned. Remove the lamb from the tin, wrap in foil and rest. \nTurn the potatoes over and return to the oven for 30 mins, then season with salt. While the potatoes are cooking, stir together all the ingredients for the yogurt.\nCombine the red wine vinegar, oil and some seasoning to make a dressing for the salad. Toss together the remaining salad ingredients, adding the dressing when youre ready to eat. Serve the lamb with the potatoes and meaty juices, with the salad and yogurt on the side.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Crush together the garlic cloves and 1 tsp salt using a pestle and mortar.",
                            "ingredients": [
                                {
                                    "id": 11215,
                                    "name": "whole garlic cloves",
                                    "image": "garlic.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404751,
                                    "name": "mortar and pestle",
                                    "image": "mortar-and-pestle.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Add the herbs, lemon zest, cinnamon, some black pepper, crush a little more, then stir through 2 tbsp of the olive oil.",
                            "ingredients": [
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "image": "olive-oil.jpg"
                                },
                                {
                                    "id": 2010,
                                    "name": "cinnamon",
                                    "image": "cinnamon.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Using a sharp knife, create lots of holes all over the lamb, and rub in the paste, pushing it deep into the holes.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404745,
                                    "name": "knife",
                                    "image": "chefs-knife.jpg"
                                }
                            ]
                        },
                        {
                            "number": 4,
                            "step": "Transfer the lamb to a large food bag, pour in the lemon juice and marinate overnight.",
                            "ingredients": [
                                {
                                    "id": 9152,
                                    "name": "lemon juice",
                                    "image": "lemon-juice.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 5,
                            "step": "The next day, take the lamb out of the fridge 1 hr before you want to cook it.",
                            "ingredients": [],
                            "equipment": []
                        },
                        {
                            "number": 6,
                            "step": "Heat oven to 160C/140C fan/gas",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 160.0,
                                        "unit": "Celsius"
                                    }
                                }
                            ]
                        },
                        {
                            "number": 7,
                            "step": "Lay 2 long pieces of baking parchment on top of 2 long pieces of foil  one widthways, the other lengthways to form a cross. Pop the potatoes in the centre of the parchment and toss with the remaining oil and some seasoning. Bring up the sides of the foil, then pour the marinade from the lamb over the potatoes and throw in the bay leaves.",
                            "ingredients": [
                                {
                                    "id": 2004,
                                    "name": "bay leaves",
                                    "image": "bay-leaves.jpg"
                                },
                                {
                                    "id": 1042027,
                                    "name": "seasoning",
                                    "image": "seasoning.png"
                                },
                                {
                                    "id": 11362,
                                    "name": "potato",
                                    "image": "potatoes-yukon-gold.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                }
                            ]
                        },
                        {
                            "number": 8,
                            "step": "Set the lamb on top of the potatoes and scrunch the foil together tightly to completely enclose the lamb. Lift into a roasting tin and roast in the oven for 4 hrs until very tender.",
                            "ingredients": [
                                {
                                    "id": 11362,
                                    "name": "potato",
                                    "image": "potatoes-yukon-gold.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg"
                                }
                            ]
                        },
                        {
                            "number": 9,
                            "step": "Remove tin from the oven and increase the temperature to 220C/200C fan/gas",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 220.0,
                                        "unit": "Celsius"
                                    }
                                }
                            ]
                        },
                        {
                            "number": 10,
                            "step": "Unwrap the parcel and scrunch the foil and parchment under the rim of the tin, baste the lamb with the juices and return to the oven for a further 20 mins until browned.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg"
                                }
                            ],
                            "length": {
                                "number": 20,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 11,
                            "step": "Remove the lamb from the tin, wrap in foil and rest.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                }
                            ]
                        },
                        {
                            "number": 12,
                            "step": "Turn the potatoes over and return to the oven for 30 mins, then season with salt. While the potatoes are cooking, stir together all the ingredients for the yogurt.",
                            "ingredients": [
                                {
                                    "id": 11362,
                                    "name": "potato",
                                    "image": "potatoes-yukon-gold.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg"
                                }
                            ],
                            "length": {
                                "number": 30,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 13,
                            "step": "Combine the red wine vinegar, oil and some seasoning to make a dressing for the salad. Toss together the remaining salad ingredients, adding the dressing when youre ready to eat.",
                            "ingredients": [
                                {
                                    "id": 1022068,
                                    "name": "red wine vinegar",
                                    "image": "red-wine-vinegar.jpg"
                                },
                                {
                                    "id": 1042027,
                                    "name": "seasoning",
                                    "image": "seasoning.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 14,
                            "step": "Serve the lamb with the potatoes and meaty juices, with the salad and yogurt on the side.",
                            "ingredients": [
                                {
                                    "id": 11362,
                                    "name": "potato",
                                    "image": "potatoes-yukon-gold.png"
                                }
                            ],
                            "equipment": []
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 26,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "preparationMinutes": 20,
            "cookingMinutes": 30,
            "sourceUrl": "https://www.bettycrocker.com/recipes/beef-tortilla-casserole/c4017d48-8eb7-4c18-aee8-22cafcab8ca9",
            "spoonacularSourceUrl": "https://spoonacular.com/beef-tortilla-casserole-182249",
            "aggregateLikes": 64,
            "spoonacularScore": 53.0,
            "healthScore": 7.0,
            "creditsText": "Betty Crocker",
            "sourceName": "Betty Crocker",
            "pricePerServing": 287.99,
            "extendedIngredients": [
                {
                    "id": 11980,
                    "aisle": "Canned and Jarred",
                    "image": "pickled-jalapenos.png",
                    "consitency": "solid",
                    "name": "canned green chiles",
                    "original": "1 can (4.5 oz) Old El Paso® chopped green chiles",
                    "originalString": "1 can (4.5 oz) Old El Paso® chopped green chiles",
                    "originalName": "can Old El Paso® chopped green chiles",
                    "amount": 4.5,
                    "unit": "oz",
                    "meta": [
                        "green",
                        "chopped",
                        "old el paso®",
                        "canned"
                    ],
                    "metaInformation": [
                        "green",
                        "chopped",
                        "old el paso®",
                        "canned"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.5,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 127.573,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 19109,
                    "aisle": "Sweet Snacks",
                    "image": "kit-kat.png",
                    "consitency": "solid",
                    "name": "kit kat",
                    "original": "1 box (14.2 oz) Old El Paso® enchilada dinner kit",
                    "originalString": "1 box (14.2 oz) Old El Paso® enchilada dinner kit",
                    "originalName": "box Old El Paso® enchilada dinner kit",
                    "amount": 14.2,
                    "unit": "oz",
                    "meta": [
                        "old el paso®"
                    ],
                    "metaInformation": [
                        "old el paso®"
                    ],
                    "measures": {
                        "us": {
                            "amount": 14.2,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 402.563,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 23557,
                    "aisle": "Meat",
                    "image": "fresh-ground-beef.jpg",
                    "consitency": "solid",
                    "name": "lean ground beef",
                    "original": "1 lb lean (at least 80%) ground beef",
                    "originalString": "1 lb lean (at least 80%) ground beef",
                    "originalName": "lean (at least 80%) ground beef",
                    "amount": 1.0,
                    "unit": "lb",
                    "meta": [
                        "80%",
                        "lean",
                        "(at least )"
                    ],
                    "metaInformation": [
                        "80%",
                        "lean",
                        "(at least )"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "lb",
                            "unitLong": "pound"
                        },
                        "metric": {
                            "amount": 453.592,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 11282,
                    "aisle": "Produce",
                    "image": "brown-onion.png",
                    "consitency": "solid",
                    "name": "onion",
                    "original": "1/2 cup chopped onion",
                    "originalString": "1/2 cup chopped onion",
                    "originalName": "chopped onion",
                    "amount": 0.5,
                    "unit": "cup",
                    "meta": [
                        "chopped"
                    ],
                    "metaInformation": [
                        "chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 118.294,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1001009,
                    "aisle": "Cheese",
                    "image": "shredded-cheddar.jpg",
                    "consitency": "solid",
                    "name": "shredded cheddar cheese",
                    "original": "1 cup shredded Cheddar cheese (4 oz)",
                    "originalString": "1 cup shredded Cheddar cheese (4 oz)",
                    "originalName": "cup shredded Cheddar cheese",
                    "amount": 4.0,
                    "unit": "oz",
                    "meta": [
                        "shredded"
                    ],
                    "metaInformation": [
                        "shredded"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 113.398,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 1056,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "sour-cream.jpg",
                    "consitency": "solid",
                    "name": "sour cream",
                    "original": "1 cup sour cream",
                    "originalString": "1 cup sour cream",
                    "originalName": "sour cream",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [
                        "sour"
                    ],
                    "metaInformation": [
                        "sour"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 14412,
                    "aisle": "Beverages",
                    "image": "water.png",
                    "consitency": "liquid",
                    "name": "water",
                    "original": "1/2 cup water",
                    "originalString": "1/2 cup water",
                    "originalName": "water",
                    "amount": 0.5,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 118.294,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                }
            ],
            "id": 182249,
            "title": "Beef Tortilla Casserole",
            "readyInMinutes": 50,
            "servings": 6,
            "image": "https://spoonacular.com/recipeImages/182249-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [],
            "occasions": [
                "fall",
                "winter"
            ],
            "winePairing": {},
            "instructions": "1                               Heat oven to 350°F. In 10-inch skillet, cook beef and onion, stirring occasionally, until beef is thoroughly cooked; drain. Stir in both pouches enchilada sauce (from dinner kit), the seasoning mix (from dinner kit), water and chiles; heat until hot.                                                          2                               In ungreased 11x7-inch baking dish, spread 1 cup of the beef mixture. Cut tortillas (from dinner kit) in half. Place 6 tortilla halves on beef; spread with 1/2 cup of the sour cream. Top with 1/2 cup of the cheese, 1 cup of the beef mixture and remaining 6 tortilla halves. Top with remaining sour cream, remaining beef mixture and remaining cheese.                                                           3                               Bake 30 minutes.  If desired, serve with additional sour cream, diced red bell pepper and chopped fresh cilantro.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Heat oven to 350°F. In 10-inch skillet, cook beef and onion, stirring occasionally, until beef is thoroughly cooked; drain. Stir in both pouches enchilada sauce (from dinner kit), the seasoning mix (from dinner kit), water and chiles; heat until hot.",
                            "ingredients": [
                                {
                                    "id": 11282,
                                    "name": "onion",
                                    "image": "brown-onion.png"
                                },
                                {
                                    "id": 14412,
                                    "name": "water",
                                    "image": "water.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                },
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 350.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "In ungreased 11x7-inch baking dish, spread 1 cup of the beef mixture.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404646,
                                    "name": "baking pan",
                                    "image": "roasting-pan.jpg"
                                }
                            ]
                        },
                        {
                            "number": 3,
                            "step": "Cut tortillas (from dinner kit) in half.",
                            "ingredients": [],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "Place 6 tortilla halves on beef; spread with 1/2 cup of the sour cream. Top with 1/2 cup of the cheese, 1 cup of the beef mixture and remaining 6 tortilla halves. Top with remaining sour cream, remaining beef mixture and remaining cheese.",
                            "ingredients": [
                                {
                                    "id": 1056,
                                    "name": "sour cream",
                                    "image": "sour-cream.jpg"
                                },
                                {
                                    "id": 1041009,
                                    "name": "cheese",
                                    "image": "cheddar-cheese.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 5,
                            "step": "Bake 30 minutes.  If desired, serve with additional sour cream, diced red bell pepper and chopped fresh cilantro.",
                            "ingredients": [
                                {
                                    "id": 1056,
                                    "name": "sour cream",
                                    "image": "sour-cream.jpg"
                                }
                            ],
                            "equipment": [],
                            "length": {
                                "number": 30,
                                "unit": "minutes"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": true,
            "veryHealthy": true,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 9,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": true,
            "preparationMinutes": 15,
            "cookingMinutes": 40,
            "sourceUrl": "http://betterinbulk.net/2014/06/grilled-pork-medallions-vegetables.html",
            "spoonacularSourceUrl": "https://spoonacular.com/grilled-pork-medallions-and-vegetables-500848",
            "aggregateLikes": 8,
            "spoonacularScore": 90.0,
            "healthScore": 58.0,
            "creditsText": "Better in Bulk",
            "sourceName": "Better in Bulk",
            "pricePerServing": 215.06,
            "extendedIngredients": [
                {
                    "id": 1002030,
                    "aisle": "Spices and Seasonings",
                    "image": "pepper.jpg",
                    "consitency": "solid",
                    "name": "black pepper",
                    "original": "½ teaspoon black pepper",
                    "originalString": "½ teaspoon black pepper",
                    "originalName": "black pepper",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [
                        "black"
                    ],
                    "metaInformation": [
                        "black"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 11215,
                    "aisle": "Produce",
                    "image": "garlic.jpg",
                    "consitency": "solid",
                    "name": "garlic",
                    "original": "2 teaspoons minced garlic",
                    "originalString": "2 teaspoons minced garlic",
                    "originalName": "minced garlic",
                    "amount": 2.0,
                    "unit": "teaspoons",
                    "meta": [
                        "minced"
                    ],
                    "metaInformation": [
                        "minced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "Olive oil",
                    "originalString": "Olive oil",
                    "originalName": "Olive oil",
                    "amount": 6.0,
                    "unit": "servings",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 6.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 11282,
                    "aisle": "Produce",
                    "image": "brown-onion.png",
                    "consitency": "solid",
                    "name": "onion",
                    "original": "1 large onion, cut into large slices",
                    "originalString": "1 large onion, cut into large slices",
                    "originalName": "onion, cut into large slices",
                    "amount": 1.0,
                    "unit": "large",
                    "meta": [
                        "cut into large slices"
                    ],
                    "metaInformation": [
                        "cut into large slices"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "large",
                            "unitLong": "large"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "large",
                            "unitLong": "large"
                        }
                    }
                },
                {
                    "id": 2028,
                    "aisle": "Spices and Seasonings",
                    "image": "paprika.jpg",
                    "consitency": "solid",
                    "name": "paprika",
                    "original": "1 teaspoon paprika",
                    "originalString": "1 teaspoon paprika",
                    "originalName": "paprika",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 10111333,
                    "aisle": "Produce",
                    "image": "green-pepper.jpg",
                    "consitency": "solid",
                    "name": "peppers",
                    "original": "6 small sweet peppers, seeds removed and quartered",
                    "originalString": "6 small sweet peppers, seeds removed and quartered",
                    "originalName": "sweet peppers, seeds removed and quartered",
                    "amount": 6.0,
                    "unit": "small",
                    "meta": [
                        "sweet",
                        "seeds removed and quartered"
                    ],
                    "metaInformation": [
                        "sweet",
                        "seeds removed and quartered"
                    ],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "small",
                            "unitLong": "smalls"
                        },
                        "metric": {
                            "amount": 6.0,
                            "unitShort": "small",
                            "unitLong": "smalls"
                        }
                    }
                },
                {
                    "id": 10218,
                    "aisle": "Meat",
                    "image": "pork-tenderloin-raw.png",
                    "consitency": "solid",
                    "name": "pork tenderloin",
                    "original": "2 pounds pork tenderloin",
                    "originalString": "2 pounds pork tenderloin",
                    "originalName": "pork tenderloin",
                    "amount": 2.0,
                    "unit": "pounds",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "lb",
                            "unitLong": "pounds"
                        },
                        "metric": {
                            "amount": 907.185,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 11362,
                    "aisle": "Produce",
                    "image": "potatoes-yukon-gold.png",
                    "consitency": "solid",
                    "name": "potatoes",
                    "original": "4-6 medium potatoes, skin on, thinly sliced",
                    "originalString": "4-6 medium potatoes, skin on, thinly sliced",
                    "originalName": "potatoes, skin on, thinly sliced",
                    "amount": 4.0,
                    "unit": "medium",
                    "meta": [
                        "thinly sliced"
                    ],
                    "metaInformation": [
                        "thinly sliced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.0,
                            "unitShort": "medium",
                            "unitLong": "mediums"
                        },
                        "metric": {
                            "amount": 4.0,
                            "unitShort": "medium",
                            "unitLong": "mediums"
                        }
                    }
                },
                {
                    "id": 1102047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt-and-pepper.jpg",
                    "consitency": "solid",
                    "name": "salt and pepper",
                    "original": "Salt and pepper, to taste",
                    "originalString": "Salt and pepper, to taste",
                    "originalName": "Salt and pepper, to taste",
                    "amount": 6.0,
                    "unit": "servings",
                    "meta": [
                        "to taste"
                    ],
                    "metaInformation": [
                        "to taste"
                    ],
                    "measures": {
                        "us": {
                            "amount": 6.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 6.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 1042047,
                    "aisle": "Spices and Seasonings",
                    "image": "garlic-salt.jpg",
                    "consitency": "solid",
                    "name": "seasoned salt",
                    "original": "1 teaspoon seasoned salt",
                    "originalString": "1 teaspoon seasoned salt",
                    "originalName": "seasoned salt",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 11477,
                    "aisle": "Produce",
                    "image": "zucchini.jpg",
                    "consitency": "solid",
                    "name": "zucchini",
                    "original": "3 medium zucchini, sliced",
                    "originalString": "3 medium zucchini, sliced",
                    "originalName": "zucchini, sliced",
                    "amount": 3.0,
                    "unit": "medium",
                    "meta": [
                        "sliced"
                    ],
                    "metaInformation": [
                        "sliced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 3.0,
                            "unitShort": "medium",
                            "unitLong": "mediums"
                        },
                        "metric": {
                            "amount": 3.0,
                            "unitShort": "medium",
                            "unitLong": "mediums"
                        }
                    }
                }
            ],
            "id": 500848,
            "title": "Grilled Pork Medallions and Vegetables",
            "readyInMinutes": 55,
            "servings": 6,
            "image": "https://spoonacular.com/recipeImages/500848-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free",
                "dairy free",
                "whole 30"
            ],
            "occasions": [
                "father's day",
                "4th of july",
                "summer"
            ],
            "winePairing": {},
            "instructions": "Prep:PREHEAT grill to medium.COMBINE brown sugar, minced garlic, seasoned salt, paprika and black pepper in a small bowl; set aside.SLICE pork tenderloin into 1-inch medallions; set in a large baking dish. Generously rub each side of the pork slices with seasoning rub. Set aside.TEAR off 6 sheets (12×18 –inches each) of Reynolds® Wrap Aluminum Foil and set on a flat surface. Lay 2-3 pork medallions in the middle of one sheet of foil. Add one-sixth of the potatoes, zucchini, sweet peppers, and onions on top of pork. Drizzle vegetables with a small amount of olive oil and sprinkle with salt and pepper.Bring up foil sides. Double-fold top and ends to seal packet, leaving room for heat circulation inside. Repeat to make six packets.Cook:GRILL over medium to high heat. When grill is hot, ADD packets directly to the grill, meat-side down. Lower lid and cook for 10-15 minutes.TURN the packets over to cook vegetable-side down, with lid closed, for another 15 minutes.AFTER 20-25 minutes total cooking time, check for doneness by removing one packet onto a plate and. OPEN packet carefully by cutting along top fold with a sharp knife, allowing steam to escape; then open top of foil packetIf additional time is needed, place packet back on the grill and continue cooking for another 5 minutes.SERVE: simply open packets and serve each individual portion on a plate.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Prep:PREHEAT grill to medium.COMBINE brown sugar, minced garlic, seasoned salt, paprika and black pepper in a small bowl; set aside.SLICE pork tenderloin into 1-inch medallions; set in a large baking dish. Generously rub each side of the pork slices with seasoning rub. Set aside.TEAR off 6 sheets (12×18 –inches each) of Reynolds® Wrap Aluminum Foil and set on a flat surface. Lay 2-3 pork medallions in the middle of one sheet of foil.",
                            "ingredients": [
                                {
                                    "id": 10218,
                                    "name": "pork tenderloin",
                                    "image": "pork-tenderloin-raw.png"
                                },
                                {
                                    "id": 1042047,
                                    "name": "seasoned salt",
                                    "image": "garlic-salt.jpg"
                                },
                                {
                                    "id": 1002030,
                                    "name": "black pepper",
                                    "image": "pepper.jpg"
                                },
                                {
                                    "id": 2028,
                                    "name": "paprika",
                                    "image": "paprika.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                },
                                {
                                    "id": 404646,
                                    "name": "baking pan",
                                    "image": "roasting-pan.jpg"
                                },
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                },
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Add one-sixth of the potatoes, zucchini, sweet peppers, and onions on top of pork.",
                            "ingredients": [
                                {
                                    "id": 11362,
                                    "name": "potato",
                                    "image": "potatoes-yukon-gold.png"
                                },
                                {
                                    "id": 11477,
                                    "name": "zucchini",
                                    "image": "zucchini.jpg"
                                },
                                {
                                    "id": 10111333,
                                    "name": "peppers",
                                    "image": "green-pepper.jpg"
                                },
                                {
                                    "id": 11282,
                                    "name": "onion",
                                    "image": "brown-onion.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Drizzle vegetables with a small amount of olive oil and sprinkle with salt and pepper.Bring up foil sides. Double-fold top and ends to seal packet, leaving room for heat circulation inside. Repeat to make six packets.Cook:GRILL over medium to high heat. When grill is hot, ADD packets directly to the grill, meat-side down. Lower lid and cook for 10-15 minutes.TURN the packets over to cook vegetable-side down, with lid closed, for another 15 minutes.AFTER 20-25 minutes total cooking time, check for doneness by removing one packet onto a plate and. OPEN packet carefully by cutting along top fold with a sharp knife, allowing steam to escape; then open top of foil packet",
                            "ingredients": [
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "image": "olive-oil.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                },
                                {
                                    "id": 404745,
                                    "name": "knife",
                                    "image": "chefs-knife.jpg"
                                },
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                }
                            ],
                            "length": {
                                "number": 55,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 4,
                            "step": "If additional time is needed, place packet back on the grill and continue cooking for another 5 minutes.SERVE: simply open packets and serve each individual portion on a plate.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                }
                            ],
                            "length": {
                                "number": 5,
                                "unit": "minutes"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": true,
            "sustainable": false,
            "weightWatcherSmartPoints": 18,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "preparationMinutes": 10,
            "cookingMinutes": 25,
            "sourceUrl": "http://www.halfbakedharvest.com/curried-zucchini-chicken-and-goat-cheese-rolls-with-cashew-mango-fried-rice/",
            "spoonacularSourceUrl": "https://spoonacular.com/spicy-curried-zucchini-chicken-and-goat-cheese-rolls-with-mango-+-cahsew-fired-rice-550022",
            "aggregateLikes": 3689,
            "spoonacularScore": 91.0,
            "healthScore": 22.0,
            "creditsText": "Half Baked Harvest",
            "sourceName": "Half Baked Harvest",
            "pricePerServing": 339.76,
            "extendedIngredients": [
                {
                    "id": 12087,
                    "aisle": "Nuts;Savory Snacks",
                    "image": "cashews.jpg",
                    "consitency": "solid",
                    "name": "cashews",
                    "original": "1/3 cup cashews, plus more for garnish",
                    "originalString": "1/3 cup cashews, plus more for garnish",
                    "originalName": "cashews, plus more for garnish",
                    "amount": 0.3333333333333333,
                    "unit": "cup",
                    "meta": [
                        "plus more for garnish"
                    ],
                    "metaInformation": [
                        "plus more for garnish"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.333,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 78.863,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 2031,
                    "aisle": "Spices and Seasonings",
                    "image": "chili-powder.jpg",
                    "consitency": "solid",
                    "name": "cayenne",
                    "original": "1/2 teaspoon cayenne (use less for less heat)",
                    "originalString": "1/2 teaspoon cayenne (use less for less heat)",
                    "originalName": "cayenne (use less for less heat)",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [
                        "for less heat)"
                    ],
                    "metaInformation": [
                        "for less heat)"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 4047,
                    "aisle": "Health Foods;Baking",
                    "image": "oil-coconut.jpg",
                    "consitency": "liquid",
                    "name": "coconut oil",
                    "original": "1/4 cup coconut oil, divided",
                    "originalString": "1/4 cup coconut oil, divided",
                    "originalName": "coconut oil, divided",
                    "amount": 0.25,
                    "unit": "cup",
                    "meta": [
                        "divided"
                    ],
                    "metaInformation": [
                        "divided"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 59.147,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1032009,
                    "aisle": "Spices and Seasonings",
                    "image": "red-pepper-flakes.jpg",
                    "consitency": "solid",
                    "name": "crushed red pepper",
                    "original": "1 teaspoon crushed red pepper",
                    "originalString": "1 teaspoon crushed red pepper",
                    "originalName": "crushed red pepper",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [
                        "red",
                        "crushed"
                    ],
                    "metaInformation": [
                        "red",
                        "crushed"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 2015,
                    "aisle": "Spices and Seasonings",
                    "image": "curry-powder.jpg",
                    "consitency": "solid",
                    "name": "curry powder",
                    "original": "1 tablespoon curry powder",
                    "originalString": "1 tablespoon curry powder",
                    "originalName": "curry powder",
                    "amount": 1.0,
                    "unit": "tablespoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 1123,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "egg.png",
                    "consitency": "solid",
                    "name": "eggs",
                    "original": "2 eggs, beaten",
                    "originalString": "2 eggs, beaten",
                    "originalName": "eggs, beaten",
                    "amount": 2.0,
                    "unit": "",
                    "meta": [
                        "beaten"
                    ],
                    "metaInformation": [
                        "beaten"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 11165,
                    "aisle": "Produce;Spices and Seasonings",
                    "image": "cilantro.png",
                    "consitency": "solid",
                    "name": "fresh cilantro",
                    "original": "fresh cilantro, for garnish",
                    "originalString": "fresh cilantro, for garnish",
                    "originalName": "fresh cilantro, for garnish",
                    "amount": 4.0,
                    "unit": "servings",
                    "meta": [
                        "fresh",
                        "for garnish"
                    ],
                    "metaInformation": [
                        "fresh",
                        "for garnish"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        },
                        "metric": {
                            "amount": 4.0,
                            "unitShort": "servings",
                            "unitLong": "servings"
                        }
                    }
                },
                {
                    "id": 11216,
                    "aisle": "Produce;Ethnic Foods;Spices and Seasonings",
                    "image": "ginger.png",
                    "consitency": "solid",
                    "name": "fresh ginger",
                    "original": "1/2 teaspoon fresh ginger, grated",
                    "originalString": "1/2 teaspoon fresh ginger, grated",
                    "originalName": "fresh ginger, grated",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [
                        "fresh",
                        "grated"
                    ],
                    "metaInformation": [
                        "fresh",
                        "grated"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 11216,
                    "aisle": "Produce;Ethnic Foods;Spices and Seasonings",
                    "image": "ginger.png",
                    "consitency": "solid",
                    "name": "fresh ginger",
                    "original": "1 teaspoon fresh ginger, grated",
                    "originalString": "1 teaspoon fresh ginger, grated",
                    "originalName": "fresh ginger, grated",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [
                        "fresh",
                        "grated"
                    ],
                    "metaInformation": [
                        "fresh",
                        "grated"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 11215,
                    "aisle": "Produce",
                    "image": "garlic.jpg",
                    "consitency": "solid",
                    "name": "garlic",
                    "original": "2 cloves garlic, minced or grated",
                    "originalString": "2 cloves garlic, minced or grated",
                    "originalName": "garlic, minced or grated",
                    "amount": 2.0,
                    "unit": "cloves",
                    "meta": [
                        "minced",
                        "grated"
                    ],
                    "metaInformation": [
                        "minced",
                        "grated"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "cloves",
                            "unitLong": "cloves"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "cloves",
                            "unitLong": "cloves"
                        }
                    }
                },
                {
                    "id": 1159,
                    "aisle": "Cheese",
                    "image": "goat-cheese.jpg",
                    "consitency": "solid",
                    "name": "goat cheese",
                    "original": "4 ounces fresh goat cheese, softened",
                    "originalString": "4 ounces fresh goat cheese, softened",
                    "originalName": "fresh goat cheese, softened",
                    "amount": 4.0,
                    "unit": "ounces",
                    "meta": [
                        "fresh",
                        "softened"
                    ],
                    "metaInformation": [
                        "fresh",
                        "softened"
                    ],
                    "measures": {
                        "us": {
                            "amount": 4.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 113.398,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 9176,
                    "aisle": "Produce",
                    "image": "mango.jpg",
                    "consitency": "solid",
                    "name": "mango",
                    "original": "1 mango, peeled and chopped",
                    "originalString": "1 mango, peeled and chopped",
                    "originalName": "mango, peeled and chopped",
                    "amount": 1.0,
                    "unit": "",
                    "meta": [
                        "peeled",
                        "chopped"
                    ],
                    "metaInformation": [
                        "peeled",
                        "chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 4053,
                    "aisle": "Oil, Vinegar, Salad Dressing",
                    "image": "olive-oil.jpg",
                    "consitency": "liquid",
                    "name": "olive oil",
                    "original": "1/4 cup olive oil, divided",
                    "originalString": "1/4 cup olive oil, divided",
                    "originalName": "olive oil, divided",
                    "amount": 0.25,
                    "unit": "cup",
                    "meta": [
                        "divided"
                    ],
                    "metaInformation": [
                        "divided"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "cups",
                            "unitLong": "cups"
                        },
                        "metric": {
                            "amount": 59.147,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 1002030,
                    "aisle": "Spices and Seasonings",
                    "image": "pepper.jpg",
                    "consitency": "solid",
                    "name": "pepper",
                    "original": "1/2 teaspoon pepper",
                    "originalString": "1/2 teaspoon pepper",
                    "originalName": "pepper",
                    "amount": 0.5,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 11821,
                    "aisle": "Produce",
                    "image": "red-pepper.jpg",
                    "consitency": "solid",
                    "name": "red bell pepper",
                    "original": "1 red pepper, chopped",
                    "originalString": "1 red pepper, chopped",
                    "originalName": "red pepper, chopped",
                    "amount": 1.0,
                    "unit": "",
                    "meta": [
                        "red",
                        "chopped"
                    ],
                    "metaInformation": [
                        "red",
                        "chopped"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 20444,
                    "aisle": "Pasta and Rice",
                    "image": "uncooked-white-rice.png",
                    "consitency": "solid",
                    "name": "rice",
                    "original": "1 [batch coconut rice | or 3 cups cooked rice",
                    "originalString": "1 [batch coconut rice | or 3 cups cooked rice",
                    "originalName": "[batch coconut rice | or 3 cups cooked rice",
                    "amount": 1.0,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 2047,
                    "aisle": "Spices and Seasonings",
                    "image": "salt.jpg",
                    "consitency": "solid",
                    "name": "salt",
                    "original": "1/4 teaspoon salt",
                    "originalString": "1/4 teaspoon salt",
                    "originalName": "salt",
                    "amount": 0.25,
                    "unit": "teaspoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 0.25,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.25,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 1055062,
                    "aisle": "Meat",
                    "image": "chicken-breasts.png",
                    "consitency": "solid",
                    "name": "skinless boneless chicken breasts",
                    "original": "2 boneless skinless chicken breasts, cut into bit size pieces",
                    "originalString": "2 boneless skinless chicken breasts, cut into bit size pieces",
                    "originalName": "boneless skinless chicken breasts, cut into bit size pieces",
                    "amount": 2.0,
                    "unit": "",
                    "meta": [
                        "boneless",
                        "skinless",
                        "cut into bit size pieces"
                    ],
                    "metaInformation": [
                        "boneless",
                        "skinless",
                        "cut into bit size pieces"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 16124,
                    "aisle": "Ethnic Foods;Condiments",
                    "image": "soy-sauce.jpg",
                    "consitency": "liquid",
                    "name": "soy sauce",
                    "original": "2 tablespoon soy sauce",
                    "originalString": "2 tablespoon soy sauce",
                    "originalName": "soy sauce",
                    "amount": 2.0,
                    "unit": "tablespoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 1016168,
                    "aisle": "Condiments",
                    "image": "hot-sauce-or-tabasco.png",
                    "consitency": "liquid",
                    "name": "sriracha hot sauce",
                    "original": "1 tablespoon Sriracha hot sauce",
                    "originalString": "1 tablespoon Sriracha hot sauce",
                    "originalName": "Sriracha hot sauce",
                    "amount": 1.0,
                    "unit": "tablespoon",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "Tbsp",
                            "unitLong": "Tbsp"
                        }
                    }
                },
                {
                    "id": 93605,
                    "aisle": "Ethnic Foods",
                    "image": "chili-paste.png",
                    "consitency": "solid",
                    "name": "thai red curry paste",
                    "original": "1 teaspoon thai red curry paste",
                    "originalString": "1 teaspoon thai red curry paste",
                    "originalName": "thai red curry paste",
                    "amount": 1.0,
                    "unit": "teaspoon",
                    "meta": [
                        "red"
                    ],
                    "metaInformation": [
                        "red"
                    ],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        },
                        "metric": {
                            "amount": 1.0,
                            "unitShort": "tsp",
                            "unitLong": "teaspoon"
                        }
                    }
                },
                {
                    "id": 93605,
                    "aisle": "Ethnic Foods",
                    "image": "chili-paste.png",
                    "consitency": "solid",
                    "name": "thai red curry paste",
                    "original": "2 tablespoons thai red curry paste",
                    "originalString": "2 tablespoons thai red curry paste",
                    "originalName": "thai red curry paste",
                    "amount": 2.0,
                    "unit": "tablespoons",
                    "meta": [
                        "red"
                    ],
                    "metaInformation": [
                        "red"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "Tbsps",
                            "unitLong": "Tbsps"
                        }
                    }
                },
                {
                    "id": 11477,
                    "aisle": "Produce",
                    "image": "zucchini.jpg",
                    "consitency": "solid",
                    "name": "zucchini",
                    "original": "3-4 zucchini, sliced lengthwise into 1/4-inch slices",
                    "originalString": "3-4 zucchini, sliced lengthwise into 1/4-inch slices",
                    "originalName": "zucchini, sliced lengthwise into 1/4-inch slices",
                    "amount": 3.0,
                    "unit": "",
                    "meta": [
                        "sliced lengthwise into 1/4-inch slices"
                    ],
                    "metaInformation": [
                        "sliced lengthwise into 1/4-inch slices"
                    ],
                    "measures": {
                        "us": {
                            "amount": 3.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 3.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                }
            ],
            "id": 550022,
            "title": "Spicy Curried Zucchini, Chicken and Goat Cheese Rolls with Mango + Cahsew Fired Rice",
            "readyInMinutes": 35,
            "servings": 4,
            "image": "https://spoonacular.com/recipeImages/550022-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free"
            ],
            "occasions": [],
            "winePairing": {},
            "instructions": "Instructions*At least 30 minutes before grilling, soak your skewers (if they are bamboo) in water for 30 minutes to prevent them from charring.Combine 3 tablespoons olive oil, thai red curry paste, curry powder, cayenne, garlic, ginger, salt and pepper in a medium bowl. Add the chicken and toss well, making sure the curry mixture completely coats the chicken. Let this sit while you prep the zucchini.Brush the slices of zucchini with the remaining olive oil on both sides. Season with salt and pepper. Set aside.Preheat the grill to medium high.While the grill preheats make the mango fried rice, heat a large skillet over medium-high heat. Toss in the cashews and dry toast them for about 5 minutes, flipping occasionally. They should be slightly browned in some spots, but its okay if theyre unevenly browned, you dont have to be too precise about it. Transfer cashews to a large plate.Add 1 tablespoon of oil and the red pepper. Cook for 3 to 5 minutes, until the red pepper is seared. Add the garlic, ginger, and red pepper flakes, and toss for 30 seconds or so, being careful not to burn. Remove the veggies from the pan and place on the plate with the cashews.Add another tablespoon of oil to the pan. Add the eggs and season with salt and pepper. Stir the eggs constantly and cook until almost set but still moist, then transfer egg to a bowl. Break the eggs up with a wooden spoon or spatula.Add 1 more tablespoon of oil to the pan and about half of the rice. Toss to coat, then add in the remaining rice, tossing once again. Cook for about 3 minutes, tossing often, until warmed through.Add the soy sauce, hot sauce and red curry paste, and toss. Cook for another 3 minutes, until the rice has browned sufficiently. Add the veggies back in and the cashews and mango. Cook just until mangos are heated through. Keep warm on the stove while you grill the chicken and zucchini.When ready to grill, place the chicken onto the skewers (or if you do not have skewers you can place the chicken in foil or cook on the stove).Grill the chicken for 3-4 minutes per side, gently flipping 2-3 times until chicken is cooked through and has light char marks. While the chicken is grilling grill the zucchini for about 4 minutes on each side, or until tender. You may also use a grill pan to do this.Once done remove everything from grill. Then spread the softened goat cheese all the way down one side of the zucchini. Place once piece of chicken on one end of the zucchini, right on top of the goat cheese and then roll up and place seam side down on a platter. Repeat with the rest of the zucchini slices.Serve the warm rice in a bowl and top with 3 or 4 warm zucchini rolls. Garnish with cilantro and more cashews.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Combine 3 tablespoons olive oil, thai red curry paste, curry powder, cayenne, garlic, ginger, salt and pepper in a medium bowl.",
                            "ingredients": [
                                {
                                    "id": 93605,
                                    "name": "thai red curry paste",
                                    "image": "chili-paste.png"
                                },
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 2015,
                                    "name": "curry powder",
                                    "image": "curry-powder.jpg"
                                },
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "image": "olive-oil.jpg"
                                },
                                {
                                    "id": 2031,
                                    "name": "ground cayenne pepper",
                                    "image": "chili-powder.jpg"
                                },
                                {
                                    "id": 11215,
                                    "name": "garlic",
                                    "image": "garlic.png"
                                },
                                {
                                    "id": 11216,
                                    "name": "ginger",
                                    "image": "ginger.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Add the chicken and toss well, making sure the curry mixture completely coats the chicken.",
                            "ingredients": [],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Let this sit while you prep the zucchini.",
                            "ingredients": [
                                {
                                    "id": 11477,
                                    "name": "zucchini",
                                    "image": "zucchini.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "Brush the slices of zucchini with the remaining olive oil on both sides. Season with salt and pepper. Set aside.Preheat the grill to medium high.While the grill preheats make the mango fried rice, heat a large skillet over medium-high heat. Toss in the cashews and dry toast them for about 5 minutes, flipping occasionally. They should be slightly browned in some spots, but its okay if theyre unevenly browned, you dont have to be too precise about it.",
                            "ingredients": [
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "image": "olive-oil.jpg"
                                },
                                {
                                    "id": 11477,
                                    "name": "zucchini",
                                    "image": "zucchini.jpg"
                                },
                                {
                                    "id": 12087,
                                    "name": "cashews",
                                    "image": "cashews.jpg"
                                },
                                {
                                    "id": 9176,
                                    "name": "mango",
                                    "image": "mango.jpg"
                                },
                                {
                                    "id": 20444,
                                    "name": "rice",
                                    "image": "uncooked-white-rice.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                },
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                }
                            ],
                            "length": {
                                "number": 5,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 5,
                            "step": "Transfer cashews to a large plate.",
                            "ingredients": [
                                {
                                    "id": 12087,
                                    "name": "cashews",
                                    "image": "cashews.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 6,
                            "step": "Add 1 tablespoon of oil and the red pepper. Cook for 3 to 5 minutes, until the red pepper is seared.",
                            "ingredients": [
                                {
                                    "id": 11821,
                                    "name": "red pepper",
                                    "image": "red-pepper.jpg"
                                }
                            ],
                            "equipment": [],
                            "length": {
                                "number": 3,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 7,
                            "step": "Add the garlic, ginger, and red pepper flakes, and toss for 30 seconds or so, being careful not to burn.",
                            "ingredients": [
                                {
                                    "id": 1032009,
                                    "name": "red pepper flakes",
                                    "image": "red-pepper-flakes.jpg"
                                },
                                {
                                    "id": 11215,
                                    "name": "garlic",
                                    "image": "garlic.png"
                                },
                                {
                                    "id": 11216,
                                    "name": "ginger",
                                    "image": "ginger.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 8,
                            "step": "Remove the veggies from the pan and place on the plate with the cashews.",
                            "ingredients": [
                                {
                                    "id": 12087,
                                    "name": "cashews",
                                    "image": "cashews.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                }
                            ]
                        },
                        {
                            "number": 9,
                            "step": "Add another tablespoon of oil to the pan.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                }
                            ]
                        },
                        {
                            "number": 10,
                            "step": "Add the eggs and season with salt and pepper. Stir the eggs constantly and cook until almost set but still moist, then transfer egg to a bowl. Break the eggs up with a wooden spoon or spatula.",
                            "ingredients": [
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 1123,
                                    "name": "egg",
                                    "image": "egg.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404732,
                                    "name": "wooden spoon",
                                    "image": "wooden-spoon.jpg"
                                },
                                {
                                    "id": 404642,
                                    "name": "spatula",
                                    "image": "spatula-or-turner.jpg"
                                },
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 11,
                            "step": "Add 1 more tablespoon of oil to the pan and about half of the rice. Toss to coat, then add in the remaining rice, tossing once again. Cook for about 3 minutes, tossing often, until warmed through.",
                            "ingredients": [
                                {
                                    "id": 20444,
                                    "name": "rice",
                                    "image": "uncooked-white-rice.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404645,
                                    "name": "frying pan",
                                    "image": "pan.png"
                                }
                            ],
                            "length": {
                                "number": 3,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 12,
                            "step": "Add the soy sauce, hot sauce and red curry paste, and toss. Cook for another 3 minutes, until the rice has browned sufficiently.",
                            "ingredients": [
                                {
                                    "id": 93605,
                                    "name": "red curry paste",
                                    "image": "chili-paste.png"
                                },
                                {
                                    "id": 6168,
                                    "name": "hot sauce",
                                    "image": "hot-sauce-or-tabasco.png"
                                },
                                {
                                    "id": 16124,
                                    "name": "soy sauce",
                                    "image": "soy-sauce.jpg"
                                },
                                {
                                    "id": 20444,
                                    "name": "rice",
                                    "image": "uncooked-white-rice.png"
                                }
                            ],
                            "equipment": [],
                            "length": {
                                "number": 3,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 13,
                            "step": "Add the veggies back in and the cashews and mango. Cook just until mangos are heated through. Keep warm on the stove while you grill the chicken and zucchini.When ready to grill, place the chicken onto the skewers (or if you do not have skewers you can place the chicken in foil or cook on the stove).Grill the chicken for 3-4 minutes per side, gently flipping 2-3 times until chicken is cooked through and has light char marks. While the chicken is grilling grill the zucchini for about 4 minutes on each side, or until tender. You may also use a grill pan to do this.Once done remove everything from grill. Then spread the softened goat cheese all the way down one side of the zucchini.",
                            "ingredients": [
                                {
                                    "id": 1159,
                                    "name": "goat cheese",
                                    "image": "goat-cheese.jpg"
                                },
                                {
                                    "id": 11477,
                                    "name": "zucchini",
                                    "image": "zucchini.jpg"
                                },
                                {
                                    "id": 12087,
                                    "name": "cashews",
                                    "image": "cashews.jpg"
                                },
                                {
                                    "id": 9176,
                                    "name": "mango",
                                    "image": "mango.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404648,
                                    "name": "grill pan",
                                    "image": "grill-pan.jpg"
                                },
                                {
                                    "id": 3065,
                                    "name": "skewers",
                                    "image": "wooden-skewers.jpg"
                                },
                                {
                                    "id": 404706,
                                    "name": "grill",
                                    "image": "grill.jpg"
                                },
                                {
                                    "id": 404794,
                                    "name": "stove",
                                    "image": "oven.jpg"
                                },
                                {
                                    "id": 404765,
                                    "name": "aluminum foil",
                                    "image": "aluminum-foil.png"
                                }
                            ],
                            "length": {
                                "number": 8,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 14,
                            "step": "Place once piece of chicken on one end of the zucchini, right on top of the goat cheese and then roll up and place seam side down on a platter. Repeat with the rest of the zucchini slices.",
                            "ingredients": [
                                {
                                    "id": 1159,
                                    "name": "goat cheese",
                                    "image": "goat-cheese.jpg"
                                },
                                {
                                    "id": 11477,
                                    "name": "zucchini",
                                    "image": "zucchini.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 15,
                            "step": "Serve the warm rice in a bowl and top with 3 or 4 warm zucchini rolls.",
                            "ingredients": [
                                {
                                    "id": 11477,
                                    "name": "zucchini",
                                    "image": "zucchini.jpg"
                                },
                                {
                                    "id": 20444,
                                    "name": "rice",
                                    "image": "uncooked-white-rice.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404783,
                                    "name": "bowl",
                                    "image": "bowl.jpg"
                                }
                            ]
                        },
                        {
                            "number": 16,
                            "step": "Garnish with cilantro and more cashews.",
                            "ingredients": [
                                {
                                    "id": 11165,
                                    "name": "cilantro",
                                    "image": "cilantro.png"
                                },
                                {
                                    "id": 12087,
                                    "name": "cashews",
                                    "image": "cashews.jpg"
                                }
                            ],
                            "equipment": []
                        }
                    ]
                }
            ]
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "veryHealthy": false,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "weightWatcherSmartPoints": 10,
            "gaps": "no",
            "lowFodmap": false,
            "ketogenic": false,
            "whole30": false,
            "preparationMinutes": 20,
            "cookingMinutes": 50,
            "sourceUrl": "http://www.kraftrecipes.com/recipes/cheesy-baked-ham-roll-ups-138244.aspx",
            "spoonacularSourceUrl": "https://spoonacular.com/cheesy-baked-ham-roll-ups-284669",
            "aggregateLikes": 52,
            "spoonacularScore": 55.0,
            "healthScore": 7.0,
            "creditsText": "Kraft Recipes",
            "sourceName": "Kraft Recipes",
            "pricePerServing": 76.08,
            "extendedIngredients": [
                {
                    "id": 1002030,
                    "aisle": "Spices and Seasonings",
                    "image": "pepper.jpg",
                    "consitency": "solid",
                    "name": "black pepper",
                    "original": "1/2 tsp. black pepper",
                    "originalString": "1/2 tsp. black pepper",
                    "originalName": "black pepper",
                    "amount": 0.5,
                    "unit": "tsp",
                    "meta": [
                        "black"
                    ],
                    "metaInformation": [
                        "black"
                    ],
                    "measures": {
                        "us": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        },
                        "metric": {
                            "amount": 0.5,
                            "unitShort": "tsps",
                            "unitLong": "teaspoons"
                        }
                    }
                },
                {
                    "id": 1041009,
                    "aisle": "Cheese",
                    "image": "cheddar-cheese.png",
                    "consitency": "solid",
                    "name": "cheese",
                    "original": "1 pkg. (8 oz.) KRAFT Mexican Style Shredded Four Cheese with a TOUCH OF PHILADELPHIA",
                    "originalString": "1 pkg. (8 oz.) KRAFT Mexican Style Shredded Four Cheese with a TOUCH OF PHILADELPHIA",
                    "originalName": "pkg. KRAFT Mexican Style Shredded Four Cheese with a TOUCH OF PHILADELPHIA",
                    "amount": 8.0,
                    "unit": "oz",
                    "meta": [
                        "shredded",
                        "with a touch of philadelphia",
                        "mexican style",
                        "kraft"
                    ],
                    "metaInformation": [
                        "shredded",
                        "with a touch of philadelphia",
                        "mexican style",
                        "kraft"
                    ],
                    "measures": {
                        "us": {
                            "amount": 8.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 226.796,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 10010151,
                    "aisle": "Meat",
                    "image": "ham.png",
                    "consitency": "solid",
                    "name": "deli ham",
                    "original": "1 pkg. (9 oz.) OSCAR MAYER Deli Fresh Honey Ham",
                    "originalString": "1 pkg. (9 oz.) OSCAR MAYER Deli Fresh Honey Ham",
                    "originalName": "pkg. OSCAR MAYER Deli Fresh Honey Ham",
                    "amount": 9.0,
                    "unit": "oz",
                    "meta": [
                        "fresh"
                    ],
                    "metaInformation": [
                        "fresh"
                    ],
                    "measures": {
                        "us": {
                            "amount": 9.0,
                            "unitShort": "oz",
                            "unitLong": "ounces"
                        },
                        "metric": {
                            "amount": 255.146,
                            "unitShort": "g",
                            "unitLong": "grams"
                        }
                    }
                },
                {
                    "id": 1123,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "egg.png",
                    "consitency": "solid",
                    "name": "eggs",
                    "original": "12 eggs",
                    "originalString": "12 eggs",
                    "originalName": "eggs",
                    "amount": 12.0,
                    "unit": "",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 12.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 12.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 1077,
                    "aisle": "Milk, Eggs, Other Dairy",
                    "image": "milk.png",
                    "consitency": "liquid",
                    "name": "milk",
                    "original": "1 cup milk",
                    "originalString": "1 cup milk",
                    "originalName": "milk",
                    "amount": 1.0,
                    "unit": "cup",
                    "meta": [],
                    "metaInformation": [],
                    "measures": {
                        "us": {
                            "amount": 1.0,
                            "unitShort": "cup",
                            "unitLong": "cup"
                        },
                        "metric": {
                            "amount": 236.588,
                            "unitShort": "ml",
                            "unitLong": "milliliters"
                        }
                    }
                },
                {
                    "id": 10411529,
                    "aisle": "Produce",
                    "image": "plum-tomatoes.png",
                    "consitency": "solid",
                    "name": "plum tomatoes",
                    "original": "2 plum tomatoes, sliced",
                    "originalString": "2 plum tomatoes, sliced",
                    "originalName": "plum tomatoes, sliced",
                    "amount": 2.0,
                    "unit": "",
                    "meta": [
                        "sliced"
                    ],
                    "metaInformation": [
                        "sliced"
                    ],
                    "measures": {
                        "us": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        },
                        "metric": {
                            "amount": 2.0,
                            "unitShort": "",
                            "unitLong": ""
                        }
                    }
                },
                {
                    "id": 18069,
                    "aisle": "Gluten Free",
                    "image": "white-bread.jpg",
                    "consitency": "solid",
                    "name": "white bread",
                    "original": "24 slices white bread, crusts removed, flattened",
                    "originalString": "24 slices white bread, crusts removed, flattened",
                    "originalName": "white bread, crusts removed, flattened",
                    "amount": 24.0,
                    "unit": "slices",
                    "meta": [
                        "white"
                    ],
                    "metaInformation": [
                        "white"
                    ],
                    "measures": {
                        "us": {
                            "amount": 24.0,
                            "unitShort": "slices",
                            "unitLong": "slices"
                        },
                        "metric": {
                            "amount": 24.0,
                            "unitShort": "slices",
                            "unitLong": "slices"
                        }
                    }
                }
            ],
            "id": 284669,
            "title": "Cheesy Baked Ham Roll-Ups",
            "readyInMinutes": 70,
            "servings": 12,
            "image": "https://spoonacular.com/recipeImages/284669-556x370.jpg",
            "imageType": "jpg",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [],
            "occasions": [],
            "winePairing": {},
            "instructions": "Top bread slices with ham; roll up.  Place, seam sides down, in 13x9-inch baking dish sprayed with cooking spray.                                            Whisk eggs, milk and pepper until blended; pour over roll-ups.  Refrigerate overnight.                                            Heat oven to 350F.  Top roll-ups with cheese and tomatoes.                                              Bake (uncovered) 45 to 50 min. or until knife inserted in center comes out clean.",
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "Top bread slices with ham; roll up.",
                            "ingredients": [
                                {
                                    "id": 10151,
                                    "name": "ham",
                                    "image": "ham-whole.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 2,
                            "step": "Place, seam sides down, in 13x9-inch baking dish sprayed with cooking spray.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404646,
                                    "name": "baking pan",
                                    "image": "roasting-pan.jpg"
                                }
                            ]
                        },
                        {
                            "number": 3,
                            "step": "Whisk eggs, milk and pepper until blended; pour over roll-ups.  Refrigerate overnight.",
                            "ingredients": [
                                {
                                    "id": 1002030,
                                    "name": "pepper",
                                    "image": "pepper.jpg"
                                },
                                {
                                    "id": 1123,
                                    "name": "egg",
                                    "image": "egg.png"
                                },
                                {
                                    "id": 1077,
                                    "name": "milk",
                                    "image": "milk.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404661,
                                    "name": "whisk",
                                    "image": "whisk.png"
                                }
                            ]
                        },
                        {
                            "number": 4,
                            "step": "Heat oven to 350F.  Top roll-ups with cheese and tomatoes.",
                            "ingredients": [
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "image": "tomato.png"
                                },
                                {
                                    "id": 1041009,
                                    "name": "cheese",
                                    "image": "cheddar-cheese.png"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "image": "oven.jpg",
                                    "temperature": {
                                        "number": 350.0,
                                        "unit": "Fahrenheit"
                                    }
                                }
                            ]
                        },
                        {
                            "number": 5,
                            "step": "Bake (uncovered) 45 to 50 min. or until knife inserted in center comes out clean.",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404745,
                                    "name": "knife",
                                    "image": "chefs-knife.jpg"
                                }
                            ],
                            "length": {
                                "number": 45,
                                "unit": "minutes"
                            }
                        }
                    ]
                }
            ]
        }
    ]
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


const HomeScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(new Map());
  const [searchResult, setsearchResult] = React.useState([]);
  const [recepieString, onChangeText] = React.useState('');

  useEffect(() => {
    setsearchResult([
      ...searchResult,
      ...RandomData.recipes
    ]);
    setTimeout(() => {
      RandomRecepies()
    }, 500);
  },[]);

  const onSelect = React.useCallback(
    title => {
      const newSelected = new Map(selected);
      newSelected.set(title, !selected.get(title));
      setSelected(newSelected);
    },
    [selected],
  );

  const ClearSearchField = () => {
    onChangeText('')
    Keyboard.dismiss()
  }

  const QuickSearch = () => {
    // setLoading(true)
    // fetch(`https://api.spoonacular.com/recipes/search?apiKey=2b04a71c0d6443a4b1de041bbb0574a6&query=${recepieString}&number=1`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'Application/json',
    //     'Content-type': 'Application/json',
    //     "Authorization": '2b04a71c0d6443a4b1de041bbb0574a6'
    //   },
    // })
    // .then(response => response.json())
    // .then(responseJson => {
    //   console.log('quickSearch respons for mocking data', responseJson)
    //   responseJson.results.forEach((item) => {
    //     if(item.image.startsWith("Http")) {
    //       return item.image
    //     } else {
    //       return item.image = `${'https://spoonacular.com/recipeImages/' + item.image}`
    //     }
    //   })
    //   setsearchResult([
    //     ...responseJson.results
    //   ]);
    //    setLoading(false)
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  }
  const RandomRecepies = () => {
    setLoading(false)
    //   setsearchResult([
    //     ...searchResult,
    //     ...RandomData
    //   ]);
    //   setLoading(false)
    // fetch(`https://api.spoonacular.com/recipes/random?apiKey=2b04a71c0d6443a4b1de041bbb0574a6&number=10&tags=main+course`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'Application/json',
    //     'Content-type': 'Application/json',
    //     "Authorization": '2b04a71c0d6443a4b1de041bbb0574a6'
    //   },
    // })
    // .then(response => response.json())
    // .then(responseJson => {
    //   console.log('random respons for mocking data', responseJson)
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
                    onIconPress={() => QuickSearch(ClearSearchField())}
                    onSubmitEditing={()=> QuickSearch(ClearSearchField())}
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
                    onIconPress={() => QuickSearch(ClearSearchField())}
                    onSubmitEditing={()=> QuickSearch(ClearSearchField())}
                  />
                </View>
              </ImageBackground>

              <View style={styles.searchResultsContainer}>
                <FlatList
                  data={searchResult}
                  renderItem={({ item }) =>
                    <View style={{ marginVertical: 15 }}>
                      <View style={{justifyContent: 'center', alignSelf: 'center', width: '90%', borderRadius: 10, borderColor: 'black', borderWidth: 1, backgroundColor: '#f5edd6'}}>
                        <ImageBackground style={{height: 210, width: '100%' }}  source={{uri:   `${item.image}`}} imageStyle={{ borderTopRightRadius: 25,borderTopLeftRadius: 25 }}>

                        </ImageBackground>
                        <Text style={{marginTop: 5, left: '5%'}}>{item.title}</Text>
                        <View style={{flexDirection: 'row',  left: '5%'}}>
                          <Text style={{marginTop: 5, alignSelf: 'center'}}>Prep Time: {item.readyInMinutes} min</Text>
                          <TouchableOpacity style={styles.showInstructionsButton} onPress={() => props.navigation.navigate('ScreenTwo', {total: item}) } >
                            <Text style={{color: 'white'}}>Show me the instructions!</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>}
                  keyExtractor={item => item.id.toString()}
                />
              </View>

            </View>) }


      </View>
    );

}



export default HomeScreen


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
