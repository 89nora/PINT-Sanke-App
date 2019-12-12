import React from 'react';
import { TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image, StyleSheet } from 'react-native';
import MapScreen from './MapScreen.js';
import CameraScreen from './CameraScreen.js';

//TAB NAVIGATOR - THIS SCRIPT NOW BELONGS TO REACT-NAVIGATION-TABS

export default createAppContainer(createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      
      navigationOptions: {
        
        title: 'Map',

        tabBarIcon: ({  }) => (

          <Image source={require('./assets/Group1.png')} size={36}  />

        ),

      },

      
    },

    Camera: {
      screen: CameraScreen,
      
      navigationOptions: {
        
        title: 'Camera',

        tabBarIcon: ({  }) => (

          <Image source={require('./assets/Group2.png')} size={36}  />

        ),

      },

      
    },
  }
));


