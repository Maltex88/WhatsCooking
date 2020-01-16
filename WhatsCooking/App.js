import React from 'react';
import firebase from 'firebase';
import {createStore }from 'redux';
import { Provider } from 'react-redux';
import {firebaseConfig} from './config';
import './fixtimerbug';
//Pull in AppNavigator from the navigation folder
import AppNavigator from './navigation/AppNavigator'
firebase.initializeApp(firebaseConfig);

const initialState = {
  selectProtein:
  [

  ],
  fridgeIngredients: ['beef','Chicken','beef','beef', ],
  pantryIngredients: ['beef','beef','beef',],
  spices: ['beef','beef',],
  shoppingBasket: ['beef',],
}
const reducer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'ADDITEM':
    console.log('chicken is added to state..')
    return {
      ...state,
      selectProtein: [...state.selectProtein, {key: 'hej', type: action.value, isSelected: true, selectedClass: 'styles.selected'}],
    }
  }
    return state;
}
const store = createStore(reducer)


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
