import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
/*

import MapScreen from './MapScreen.js'; 
import CameraScreen from './CameraScreen.js';
import SettingsScreen from './SettingsScreen.js';

//import Screens from './Screens.js';


//this component does not get called, so it never executes lifecycle components. 
//this is probably why, it does not respond to any callback-functions
//in app I navigate through the screens, my theory is that these screens cannot
//have a parent component? in this case should Screens then hold the navigation?
export default class Screens extends Component {

  
//Should hold a constructor dealing with the different states on map and setting.
//or just a callback from child components ex MapScreen - sending it further as prop.
constructor(props) {
  super(props);

  this.state = {
    switchValue: null,
  };

}

componentWillMount() {
  console.log('INSIDE SCREENS COMPONENT');
}


callbackFunction = (childDataMapScreen) => {
  this.setState({switchValue: childDataMapScreen})
}



//navigationBar implicit holds all the screens.
  render() {

    return (
    
      <View style = {styles.container}>
      <MapScreen />
       
      <SettingsScreen 
      parentCallback = {this.callbackFunction}
      test="hello world"
      /> 
      <Text> {this.state.message} </Text>
      <CameraScreen />
      </View>
    
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  loadText: {
    marginBottom: '10%',
    color: 'white',
    fontSize: 28,
    textAlign: 'center'
  },
  paragraph: {
    position: 'absolute',
    marginBottom: '35%',
    color: '#FFCA00',
    fontSize: 20,
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: 'center',
    width: null,
    height: null,
  }

})

*/