import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, StyleSheet, View, Text } from 'react-native';
import MapScreen from './screens/MapScreen.js';
import CameraScreen from './screens/CameraScreen.js';
import InterestScreen from './screens/InterestScreen.js';


const MapStack = createStackNavigator({
  Map: {screen: MapScreen},
  InterestPoint: {screen: InterestScreen},
},
{
  headerMode: 'none',
}

);

const AppContainer = createAppContainer(createBottomTabNavigator(
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

export default class App extends React.Component{ 
 
constructor(props){
  super(props);
}

render() {
  return(
    <AppContainer />
  );
}

}

const styles = StyleSheet.create({
  tab: {
    alignItems: "center"
  },
  name: {
    fontSize: 12,
    textAlign: "center"
  },
});
