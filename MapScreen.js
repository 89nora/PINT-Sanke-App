import React, { Component } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, Easing, TouchableOpacity, Platform } from 'react-native';
import loading from './Loading.js';
import Map from './Map.js';
import {_getLocationAsync} from './fetchingLocation';
import {_watchPositionAsync} from './fetchingLocation';


export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      location:null,
      region: null, 
      userMarker: null,

    };
    this.spinValue = new Animated.Value(0)
    loading.load(v => this.setState({ loaded: true }));

  }
//lav til async
  //first componentWillMount is checking if using emulator, if not calls function _getLocationAsync
  componentWillMount() {
    console.log('running componentWillMount');
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      //this._getLocationAsync();
      _getLocationAsync();
    }

 //_watchPositionAsync();
    
   
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
          error: null,
        });
      }
    ); 
    
  }

  /*
  // _getLocationAsync will check if device allows permission to use location of device
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

*/

  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }



  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    }) 
   
    return (
      this.state.loaded ?
        <View style={styles.container}>  
             <Map mapRegion= {this.state.region} userMarker = {this.state.userMarker.latlng} />
             
             {this.props.navigation.getParam('switchValue', 'default value') ?
             <Text style= {styles.paragraph}>Geofencing is activated</Text>
             :
             <Text style= {styles.paragraph}>Geofencing is NOT activated</Text>

             }
          <View style={styles.buttonContainer}>
            <TouchableOpacity style= {styles.TouchableOpacityButton} onPress={() => this.props.navigation.navigate('Map')}>
              <Image source={require('./assets/Group1.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
              <Image source={require('./assets/Group2.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image source={require('./assets/Group3.png')} />
            </TouchableOpacity >
          </View> 
         
        </View>

        :

        <ImageBackground style={styles.backgroundImage} source={require('./assets/foodism1.jpg')}  >

          <Animated.Image
            style={{
              marginTop: '25%',
              width: 260,
              height: 233,
              transform: [{ rotate: spin }]
            }}
            source={require('./assets/flowers.png')}
          />

          <Text style={styles.loadText}> Loading...  </Text>

        </ImageBackground>

    )
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