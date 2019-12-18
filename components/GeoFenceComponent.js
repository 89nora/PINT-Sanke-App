import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, Image,  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initalizePointsOfInterest, pointsOfInterest} from '../utils/PointsOfInterest.js';
import Apple from '../assets/apple1.png';

export default class GeoFenceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    initialRegion: null, 
    };
  };
  
 
 componentDidMount()   
  {

        //tjekker kun radius på den forreste i den sorterede liste
        if ( pointsOfInterest[0].currentDistance<pointsOfInterest[0].radius)
        {
        
          this.props.inZone(true,pointsOfInterest[0]);
        } 
  }
  
  componentWillUnmount() 
  {
    this.watchId.remove(); // stop watching for location changes
  }
  
  getImgFromName(name) {
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


 markerInputFn = (onPressInfo) => {
  this.props.callbackFromParentInput(onPressInfo);
}

markerCoordsFn = (onPressLatitude, onPressLongitude) => {
this.props.callbackFromParentCoords(onPressLatitude, onPressLongitude);
}

  render() {
       
    return (
      console.log("geofence value " + this.props.switchValue),
      // initialRegion sørger for at mapped ikke hele tiden zoomer tilbage til start positionen når det opdateres
      <MapView style={styles.mapStyle} initialRegion={this.props.mapRegion} onLongPress={(e) => {
         console.log(e.nativeEvent.coordinate)
         this.markerInputFn(true),
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
            >
            <Image source={(this.props.switchValue == true  && p.currentDistance < p.radius) ? (require('../assets/greenApple.png')): (require('../assets/apple1.png'))} />
            </Marker>
                         
          ))} 
       
{(this.props.showCoordinates) ? <Text style={styles.paragraph}>{text}</Text> : null}

         </MapView> 
         
    
    );
  }

}

initalizePointsOfInterest();


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


