import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, Easing, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class fetchingLocation extends Component {

  _getLocationAsync = async () => {
    console.log('running getLocationAsync');
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('not granted!')
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
//getCurrentPositionAsync Returns a promise resolving to an object representing Location type.
//this set the currentPosition when app first mounts
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ 
      location:location, 
      region: {latitude: location.coords.latitude, longitude: location.coords.longitude,
        latitudeDelta: 0.1, longitudeDelta: 0.1,},  
        userMarker: {latitude: location.coords.latitude, longitude: location.coords.longitude}
    });
    console.log('location: ' + this.state.location.coords.latitude); 
};


 _watchPositionAsync = async () => {
    console.log('running watchPositionAsync');
        //Subscribe to location updates from the device. Put in options to manage how often to check for new position and when in m
       this.watchId = Location.watchPositionAsync(
            { timeInterval: 1000, distanceInterval: 1 },
      
            //this is the callback-function from watchPositionAsync and gets called every time the location is updated.
            //It is passed exactly one parameter: an object representing Location type (we call this object currentPosition). 
            //Now this object can call its keys; coords, latitude etc.
            (currentPosition) => {
              console.log('currentPosition ' + currentPosition);
              this.setState({
                location: currentPosition,
                region: {
                  latitude: currentPosition.coords.latitude,
                  longitude: currentPosition.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                },
                userMarker: {
                  latlng: {
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude,
                  }
                },
                loaded: true,
                error: null,
              });
             console.log('Kørt gennem state');
            }
          );
};
}