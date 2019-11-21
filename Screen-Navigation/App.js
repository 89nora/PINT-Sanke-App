import React, { Component, Fragment } from 'react';
import { StyleSheet,  } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { createStackNavigator, TransitionPresets, } from 'react-navigation-stack';


import MapScreen from './MapScreen.js'; 
import CameraScreen from './CameraScreen.js';
import SettingsScreen from './SettingsScreen.js';

export const AppNavigator = createStackNavigator(
  {
    Camera: CameraScreen,
    Map: MapScreen,
    Settings : SettingsScreen
  },
  {
    initialRouteName: 'Map',
    headerMode: 'none'
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return <AppContainer />;

  }
}



