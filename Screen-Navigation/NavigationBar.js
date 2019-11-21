import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, TransitionPresets, } from 'react-navigation-stack';


//import MapScreen from './MapScreen.js';
//import CameraScreen from './CameraScreen.js';
//import SettingsScreen from './SettingsScreen.js';





export default class NavigationBar extends Component {

  constructor(props) {
    super(props);

  }

    render(){
        return(
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
              <Image source={require('./assets/Group1.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
              <Image source={require('./assets/Group2.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image source={require('./assets/Group3.png')} />
            </TouchableOpacity >
          </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column-reverse',
      //alignItems: 'center',
      //paddingTop: Constants.statusBarHeight,
      //backgroundColor: '#ecf0f1',
    },
    buttonContainer: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: '10%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
})