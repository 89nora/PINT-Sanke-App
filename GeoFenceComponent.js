// Example of how to implement support for basic GeoFencing functionality 
//on top of expo-location. Auth: Tomasok PINT-Oct.2019

import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, Image,  } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import {initalizePointsOfInterest, pointsOfInterest} from './PointsOfInterest.js';

import Apple from './assets/apple1.png';
export default class GeoFenceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    location: null,
    errorMessage: null,
    region: null, 
    marker : null
    };
  };
  
 
 componentDidMount()   
  {

        //tjekker kun radius på den forreste i den sorterede liste
        if ( pointsOfInterest[0].currentDistance<pointsOfInterest[0].radius)
        {
          this.props.inZone(true,pointsOfInterest[0]);
          //console.log(this.props.showCoordinates);

        }
         // Just in case we want to log while debugging
        //console.group(pointsOfInterest);
      
    
  }

  componentWillUnmount() 
  {
    this.watchId.remove(); // stop watching for location changes
  }
  
  getImgFromName(name) {
    // If-statements kan også bruges i stedet for switch-case (e.g.: if (name === 'Rosenborg slot') return RosenborgImg;)
    switch (name) {
      case 'Æbletræ':
        return Apple;
      case 'Krydderurter':
        return Apple;
      case 'Svampe':
        return Apple;
      case 'Jordbær':
        return Apple;
    }
  }
  render() {
  //const {location} = this.state; // Taking location from overall state object


    return (
         <MapView style={styles.mapStyle} region = {this.props.mapRegion} >
        <Marker coordinate={this.props.userMarker}>
          <Image source={require('./assets/userMarker.png')} style={{ width: 50, height: 50 }} />
        </Marker>

            {pointsOfInterest.map((p,index) => (  // Create new temporary array with each of the the points of interest turned into individual
            //Markers in the new array. The new temporary array of Markers is hereafter displayed  as Markers on the map
            <Marker
              key = {index}
              coordinate={p.coords}
              title ={p.whatis}
              pinColor = {(index==0 && p.currentDistance<p.radius) ? 'blue' : 'red'}  >
              <Image source={this.getImgFromName(p.whatis)} style={{ width: 50, height: 50 }} />
              </Marker> 
          ))} 

{(this.props.showCoordinates) ? <Text style={styles.paragraph}>{text}</Text> : null}

         </MapView> 
         
    
    );
  }

}

// ------------- Things to do on start ------------------------
initalizePointsOfInterest();


// ------------ Styles ----------------------------------
const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },

});


