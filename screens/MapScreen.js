import React, { Component } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, TouchableOpacity, Easing, Slider, Button, Switch, Platform } from 'react-native';
import Loading from '../utils/Loading.js';
import GeoFenceComponent from '../components/GeoFenceComponent.js';
import SearchInput from '../components/SearchInput.js';
import { addPointOfInterest} from '../utils/PointsOfInterest.js';



import { orderDistanceArray } from '../utils/PointsOfInterest.js';
//import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      location: null,
      region: null,
      marker: null,
      switchValue: false,
      sliderValue: 30,
      Zone : false,
      ZoneText : 'non-sense',
      showSearchInput: false,
      SearchInput: '',
      onPressLatitude: null, 
      onPressLongitude: null,
    };
    console.log('constructor_boolValue: ' + this.state.switchValue);
    this.spinValue = new Animated.Value(0)
    //loading.load(v => this.setState({ loaded: true }));

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
         // Just in case we want to log while debugging
        //console.group(pointsOfInterest);
      }
    );
  }

  componentWillUnmount() 
  {
    this.watchId.remove(); // stop watching for location changes
  }

 AskPermission  = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Asking for geo permission: ' + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };


  toggleSwitch = (value) => {
    console.log('switchValue:' + value);
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
      loaded: true,

    });
    console.log('this was executed! ');
  };


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

  myCallback = (dataFromGeofence) => {
    console.log('DATA from geofence: ' + dataFromGeofence);
    this.setState({
      showSearchInput: dataFromGeofence,
    })
   }

   myCallback2 = (onPressLatitude, onPressLongitude) => {
     console.log('these are the coords for new marker: ' + onPressLatitude + onPressLongitude);
     this.setState({
       onPressLatitude: onPressLatitude,
       onPressLongitude: onPressLongitude,
    })
   }

   handleChangeInputCallback = (textInput) => {
    console.log('DET er onChange tekstinputtet: ' + textInput);
    this.setState({
      SearchInput: textInput,
    })
   }

   
   handleUpdateInput = (textInput) => {
    console.log('DET er tekstinputtet: ' + textInput);
    this.setState({
      showSearchInput: false,
      ZoneText: textInput,
      //SearchInput: textInput,
    })
    this.addMarker(this.state.onPressLatitude, this.state.onPressLongitude, this.state.sliderValue*100,this.state.SearchInput );
   }

    addMarker = (latitude,longitude, searchInput, radius ) => { 
      addPointOfInterest(latitude, longitude, searchInput, radius);
      // console.log(pointsOfInterest)
      // sætter state for at opdatere, så der ikke kommer delay når markers addes
       //this.setState({})
          }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    console.log("Marker is: " + this.state.marker)

    return (
      //ERRORMESSAGE IS NEW
      this.state.loaded ? // ternary if - loading screen
        <View style={styles.container}>


          {this.state.marker !== null ? 
          (
            <GeoFenceComponent
            // sender values så de er available som props i geofencecomponet.js
            showCoordinates={false} 
            inZone={this.inTheZone} 
            mapRegion={this.state.region}
            userMarker={this.state.marker.latlng}
            switchValue={this.state.switchValue}
            sliderValue={this.state.sliderValue}
            callbackFromParent={this.myCallback}
            callbackFromParent2={this.myCallback2}
            //searchInput= {this.state.SearchInput}
            //newMarkerCoords= {this.state.onPressLatitude, this.state.onPressLongitude}
            >    
            </GeoFenceComponent>
          ) : (console.log("Error")) }


          {this.state.showSearchInput ? 
         
          <SearchInput
            placeholder="Write name here..."
            callbackOnChangeText={this.handleChangeInputCallback}
            //Gives SearchInput an onSubmit prop, which evokes handleUpdateLocation
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
              width: '78%',
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
  button: {
    //position: 'absolute',
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