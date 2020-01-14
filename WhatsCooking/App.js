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
    {key: '312312', type: 'Beef', isSelected: false, selectedClass: 'styles.list'},
    {key: '645645', type: 'Chicken', isSelected: false, selectedClass: 'styles.list'},
    {key: '867876', type: 'Fish', isSelected: false, selectedClass: 'styles.list'},
    {key: '978987', type: 'Lamb', isSelected: false, selectedClass: 'styles.list'},
    {key: '321455', type: 'Other', isSelected: false, selectedClass: 'styles.list'}
  ],
  fridgeIngredients: ['beef','Chicken','beef','beef', ],
  pantryIngredients: ['beef','beef','beef',],
  spices: ['beef','beef',],
  shoppingBasket: ['beef',],
}
const reducer = (state = initialState, action) => {
  switch (action.type)
  {
    // case 'TOGGEL_SELECT':
    // console.log(state.selectProtein)
    // return {
    //  ...state,
    //  selectProtein: state.selectProtein.map(
    //    (selectedItem, i) => i === action.index ?
    //     {
    //       ...selectedItem,
    //        isSelected: state.isSelected = !state.isSelected,
    //       selectedClass: state.selectedClass = 'styles.selected'}
    //                              : selectedItem
    // )
    // }
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
