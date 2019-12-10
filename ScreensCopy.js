import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, Easing, TouchableOpacity, Platform } from 'react-native';
import SettingsScreen from './SettingsScreen.js';

export default class ScreensCopy extends Component {


callbackFunction = () => {
    console.log('hello wolrd');
   }


    render(){
        console.log('I AM SCREENS');
        return(
            <View>
                <SettingsScreen 
                tryCallback = {this.callbackFunction}
                />
                <Text>I AM SCREENS</Text>
            </View>
        )
    }
}