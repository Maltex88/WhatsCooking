import React from 'react';
import firebase from 'firebase';

import {firebaseConfig} from './config';
import './fixtimerbug';
//Pull in AppNavigator from the navigation folder
import AppNavigator from './navigation/AppNavigator'
  firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppNavigator />
  );
}
