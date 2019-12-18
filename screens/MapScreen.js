import React, { Component } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, TouchableOpacity, Easing, Slider, Button, Switch, Platform } from 'react-native';
import Loading from '../utils/Loading.js';
import GeoFenceComponent from '../components/GeoFenceComponent.js';
import MarkerInput from '../components/MarkerInput.js';
import { addPointOfInterest,orderDistanceArray } from '../utils/PointsOfInterest.js';


export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      location: null,
      region: null,
      marker: null,
      switchValue: false,
      sliderValue: 30,
      Zone : false,
      ZoneText : 'non-sense',
      showTextInput: false,
      TextInput: '',
      onPressLatitude: null, 
      onPressLongitude: null,
    };

   // We declare spinValue as a new Animated.Value and pass in 0 (zero).
    this.spinValue = new Animated.Value(0)
    Loading.load(v => this.setState({ loaded: true }));
  }

 componentWillMount() {
    this._getLocationAsync();
  }

  async componentDidMount()   
  {

    this.spin()

    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't 
    this.watchId = Location.watchPositionAsync(
      {accuray:Location.Accuracy.BestForNavigation , timeInterval:1000, distanceInterval:1,  mayShowUserSettingsDialog:true},
      // This is the callback function specifying  all the stuff that we want to happen whenver we have a new location
      (currentPosition) => {
        orderDistanceArray({latitude: currentPosition.coords.latitude, longitude:currentPosition.coords.longitude});
        
        this.setState({
          location:currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.075, 
            longitudeDelta: 0.075, 
          },
          marker: {
                  latlng :currentPosition.coords
          },

          error: null,
        });
      }
    );
  }

  componentWillUnmount() 
  {
    this.watchId.remove(); // stop watching for location changes
  }

 AskPermission  = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };


  toggleSwitch = (value) => {
    this.setState({ switchValue: value });
  }

  sliderChange = (sliderValue) => {
    this.setState({ sliderValue: parseFloat(sliderValue) })
  }

  inTheZone = (z,p)=>
  {
     this.setState({
       Zone : z, 
       ZoneText:p.whatis});
  };


  // _getLocationAsync will check if device allows permission to use location of device
  _getLocationAsync = async () => {
    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't 

    //getCurrentPositionAsync Returns a promise resolving to an object representing Location type.
    //this set the currentPosition when app first mounts
    let location = await Location.getCurrentPositionAsync({});
    console.log('location: ' + location);

    this.setState({
      location: location,
      region: {
        latitude: location.coords.latitude, longitude: location.coords.longitude,
        latitudeDelta: 0.1, longitudeDelta: 0.1,
      },
      marker: {
        latlng: location.coords
      },
      //loaded: true,

    });
  };


  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
      //We call start() on this Animated.timing method, and pass in a callback of this.spin which will be called 
      //when the animation is completed, basically creating an infinite animation
    ).start(() => this.spin())
  }

  showTextInputCallback = (dataFromGeofence) => {
    this.setState({
      showTextInput: dataFromGeofence,
    })
   }

   getCoordsNewMakerCallback = (onPressLatitude, onPressLongitude) => {
     this.setState({
       onPressLatitude: onPressLatitude,
       onPressLongitude: onPressLongitude,
    })
   }

   handleChangeInputCallback = (textInput) => {
    this.setState({
      TextInput: textInput,
    })
   }

   
   handleUpdateInput = (textInput) => {
    this.setState({
      showTextInput: false,
      ZoneText: textInput,
    })
    this.addMarker(this.state.onPressLatitude, this.state.onPressLongitude, this.state.sliderValue*100,this.state.TextInput );
   }

    addMarker = (latitude,longitude, TextInput, radius ) => { 
      addPointOfInterest(latitude, longitude, TextInput, radius);
          }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      this.state.loaded ? // ternary if - loading screen
        <View style={styles.container}>


          {this.state.marker !== null ? 
          (
            <GeoFenceComponent
            // sender values så de er available som props i geofencecomponet
            showCoordinates={false} 
            inZone={this.inTheZone} 
            mapRegion={this.state.region}
            userMarker={this.state.marker.latlng}
            switchValue={this.state.switchValue}
            sliderValue={this.state.sliderValue}
            callbackFromParentInput={this.showTextInputCallback}
            callbackFromParentCoords={this.getCoordsNewMakerCallback}
            >    
            </GeoFenceComponent>
          ) : (console.log("Error")) }


          {this.state.showTextInput ? 
         
          <MarkerInput
            placeholder="Write name here..."
            callbackOnChangeText={this.handleChangeInputCallback}
            onSubmit={this.handleUpdateInput}
          />
          
           :
          null
        }
          <View style={styles.buttonContainer}>
            <Button 
              title= {'show me point ' + this.state.ZoneText}
              onPress={() => this.props.navigation.navigate('InterestPoint', {what:this.state.ZoneText})}          
              />
          </View>

          <View style={styles.geoContainer}>

              <Text>GEOFENCE</Text>
              <Switch
                value={this.state.switchValue}
                onValueChange={this.toggleSwitch}
              />
              
              {this.state.switchValue ? ( // ternary if - switch on/off
                <Slider
                  style={styles.slider}
                  step={1}
                  maximumValue={40}
                  minimumValue={0}
                  onValueChange={this.sliderChange}
                  value={this.state.sliderValue}
                  disabled={false}
                />
              // ternary else - switch on/off
              ) : (null) }
              {this.state.switchValue ? (
                <Text>Geofence-radius: {this.state.sliderValue}km</Text>
              ) : (null) }
          </View>

        </View>

        : // ternary else - loading screen

        <ImageBackground style={styles.backgroundImage} source={require('../assets/foodism1.jpg')}  >

          <Animated.Image 
            style={{
              marginTop: '25%',  
              width: '90%',
              height: '50%',
              transform: [{ rotate: spin }]
            }}
            source={require('../assets/flowers.png')}
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
    flex: 1,
    position: 'absolute',
    width: "100%",
    alignItems: "flex-end",
    marginTop: '10%',
    paddingEnd: "2%",
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    marginTop: '50%',
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