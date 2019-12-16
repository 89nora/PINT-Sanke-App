import React from 'react';
import { TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, StyleSheet, View, Text } from 'react-native';
import MapScreen from './MapScreen.js';
import CameraScreen from './CameraScreen.js';
import InterestScreen from './InterestScreen.js';

//TAB NAVIGATOR - THIS SCRIPT NOW BELONGS TO REACT-NAVIGATION-TABS


const MapStack = createStackNavigator({
  Map: {screen: MapScreen},
  InterestPoint: {screen: InterestScreen},
},
{
  headerMode: 'none',
}

);

export default createAppContainer(createBottomTabNavigator(
  {
    Map: {
      screen: MapStack,
      
      navigationOptions: {
       
        title: 'Map',

        tabBarIcon: ({tintColor  }) => (

          <View style={styles.tab}>
          <Image source={require("./assets/Group1.png")} size={36} />
          <Text style={[styles.name, { color: tintColor }]}>Map</Text>
        </View>
        ),

      },

      
    },

    Camera: {
      screen: CameraScreen,
      
      navigationOptions: {
       
        title: 'Camera',

        tabBarIcon: ({ tintColor }) => (

          <View style={styles.tab}>
          <Image source={require("./assets/Group2.png")} size={36} />
          <Text style={[styles.name, { color: tintColor }]}>Camera</Text>
        </View>
        ),

      },

      
    }, 
    
/*
    Interest: {
      screen: InterestScreen,
      
      navigationOptions: {
        
        title: 'Closest Interest Point',

        tabBarIcon: ({  }) => (

          <Image source={require('./assets/Group3.png')} size={36}  />

        ),

      },

      
    },
    */
  },

  {
    initialRouteName: "Map",
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#80A0AB",
      showLabel: false,
      style: {
        height: 70,
        backgroundColor: "#485155"
      },
      labelStyle: {
        fontSize: 12,
        fontFamily: "Abel-Regular"
      }
    }
  }
));



const styles = StyleSheet.create({
  tab: {
    alignItems: "center"
  },
  name: {
    fontSize: 12,
    textAlign: "center"
  },
  image: {
    width: 200,
    height: 200
  }
});
