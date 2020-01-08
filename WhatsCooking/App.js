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
    {key: '312312', type: 'Beef'},
    {key: '645645', type: 'Chicken'},
    {key: '867876', type: 'Fish'},
    {key: '978987', type: 'Lamb'},
    {key: '321455', type: 'Other'}
  ],
  fridgeIngredients: ['beef','Chicken','beef','beef', ],
  pantryIngredients: ['beef','beef','beef',],
  spices: ['beef','beef',],
  shoppingBasket: ['beef',],
}
const reducer = (state = initialState) => {
  return state
}
const store = createStore(reducer)


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
