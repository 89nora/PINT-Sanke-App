// Example of how to implement support for basic GeoFencing functionality 
//on top of expo-location. Auth: Tomasok PINT-Oct.2019

import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, Image,  } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { initalizePointsOfInterest, pointsOfInterest, addPointOfInterest} from '../utils/PointsOfInterest.js';

import Apple from '../assets/apple1.png';
import AppleGreen from '../assets/greenApple.png';

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
  //addMarker function gets coordinates passed from onPress  event in render. 
  //Spread operator to keep the list as it is, and add new stuff. This.state.newMarkers what objects it consist of.
  //addMarker = (latitude, longitude, searchInput ) => { 
    // addPointOfInterest(latitude, longitude, this.props.sliderValue*100, searchInput)
    // console.log(pointsOfInterest)
    // sætter state for at opdatere, så der ikke kommer delay når markers addes
   //  this.setState({})
    //    }

 /**   addMarker2 = (latitude, longitude) =>{
      this.setState({
        pointsOfInterest: [this.state.pointsOfInterest,
          { latitude, 
            longitude,
            radius: 2000,
            whatis: 'Kirsebær'}
        ]
       
      })
    console.log("added to array", pointsOfInterest)
    }       
  **/

 someFn = (onPressInfo) => {
  this.props.callbackFromParent(onPressInfo);
}

markerCoordsFn = (onPressLatitude, onPressLongitude) => {
this.props.callbackFromParent2(onPressLatitude, onPressLongitude);
}

//this.addMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
  render() {
    // tje
   
  //const {location} = this.state; // Taking location from overall state object
    
    return (
      console.log("geofence value " + this.props.switchValue),
      // initialRegion sørger for at mapped ikke hele tiden zoomer tilbage til start positionen når det opdateres
      <MapView style={styles.mapStyle} initialRegion={this.props.mapRegion} onLongPress={(e) => {
         console.log(e.nativeEvent.coordinate)
         this.someFn(true),
         this.markerCoordsFn(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
         }}>
           
        <Marker coordinate={this.props.userMarker}>
          
          <Image source={require('../assets/userMarker.png')} style={{ width: 50, height: 50 }} />
        </Marker>
  
        {pointsOfInterest.map((p, index) => ( 
            // Create new temporary array with each of the the points of interest turned into individual
            //Markers in the new array. The new temporary array of Markers is hereafter displayed  as Markers on the map              
          <Marker
            key={index}
            coordinate={p.coords}
            title={p.whatis}
            onPress = {() => {}}
            //onPress = {() => {this.someFn(p.whatis)}}
            >
            <Image source={(this.props.switchValue == true  && p.currentDistance < p.radius) ? (require('../assets/greenApple.png')): (require('../assets/apple1.png'))} />
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


