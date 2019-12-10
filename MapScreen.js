import React, { Component } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, Easing, Slider, Button, Switch, Platform } from 'react-native';
import loading from './Loading.js';
import Map from './Map.js';
import { _getLocationAsync } from './fetchingLocation';
import { _watchPositionAsync } from './fetchingLocation';
import fetchingLocation from './fetchingLocation.js';
import NavigationBar from './NavigationBar.js';
import { AsyncStorage } from 'react-native';




export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      location: null,
      region: null,
      userMarker: false,
      switchValue: false,
      sliderValue: 30,
    };
    console.log('constructor_boolValue: ' + this.state.switchValue);
    this.spinValue = new Animated.Value(0)
    //loading.load(v => this.setState({ loaded: true }));

  }


 
  //first componentWillMount is checking if using emulator, if not calls function _getLocationAsync
  componentWillMount() {

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

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

  toggleSwitch = (value) => {
    console.log('switchValue:' + value);
    this.setState({ switchValue: value });
  }

  sliderChange = (sliderValue) => {
    this.setState({ sliderValue: parseFloat(sliderValue) })
  }

  /*

//retrieving data from mapScreen here: 
_retrieveData = async () => {
 
    console.log('component is mounted');  
  console.log('retrieving switchValue from settingsScreen'); 
  try {
    var switchValue = await AsyncStorage.getItem('switchValue');
    console.log('switchValue2: ' + switchValue);
    this.state.bool_switchValue = JSON.parse(switchValue);
    if (this.state.bool_switchValue !== null) {
      // We have data!!
      console.log('RETRIEVED VALUE: ' + this.state.bool_switchValue);
    }
  } catch (error) {
    // Error retrieving data
    console.log('We dont have any data from settingsScreen');
  }
};
*/

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
      location: location,
      region: {
        latitude: location.coords.latitude, longitude: location.coords.longitude,
        latitudeDelta: 0.1, longitudeDelta: 0.1,
      },
      loaded: true,

    });
    console.log('location: ' + this.state.location.coords.latitude);
  };

  /*
  componentDidUpdate() {
  
    console.log('UPDATING');
    this._retrieveData();
  }
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
      //this.startRender ?
      this.state.loaded ?
        <View style={styles.container}>

          <Map mapRegion={this.state.region} userMarker={this.state.userMarker.latlng} />


          {this.state.switchValue ?
            <View style={styles.geoContainer}>
              <View style={styles.geoMenu}>

                <Text>GEOFENCE</Text>
                <Switch
                  value={this.state.switchValue}
                  onValueChange={this.toggleSwitch}
                />
                <Slider
                  style={styles.slider}
                  step={1}
                  maximumValue={40}
                  minimumValue={0}
                  onValueChange={this.sliderChange}
                  value={this.state.sliderValue}
                  disabled={false}
                />
                <Text>Du har valgt en geofence-radius på: {this.state.sliderValue}</Text>
              </View>
            </View>

            :
            <View style={styles.geoContainer}>
              <View style={styles.geoMenu}>

                <Text>GEOFENCE</Text>
                <Switch
                  value={this.state.switchValue}
                  onValueChange={this.toggleSwitch}
                />
              </View>

            </View>

          }
        </View>

        :

        <ImageBackground style={styles.backgroundImage} source={require('./assets/foodism1.jpg')}  >

          <Animated.Image
            style={{
              marginTop: '25%',
              width: '78%',
              height: '50%',
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
    flexDirection: 'column',
  },
  geoContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingTop: '10%',
    paddingRight: '15%', 
  },
  geoMenu: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2%',
  },
  slider: {
    width: '50%',
  },
  paragraph: {
    color: 'green',
    fontSize: 20,
    textAlign: 'center'
  },
  loadText: {
    marginBottom: '10%',
    color: 'white',
    fontSize: 28,
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