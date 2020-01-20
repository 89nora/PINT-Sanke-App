import React, { Component, Fragment } from 'react';
import { Text, StyleSheet, Dimensions, Image, } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { initalizePointsOfInterest, pointsOfInterest } from '../utils/PointsOfInterest.js';
const radius = 1000;
export default class GeoFenceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: null,
    };
  };

  componentDidMount() {
    //tjekker kun radius på den forreste i den sorterede liste
    if (pointsOfInterest[0].currentDistance < pointsOfInterest[0].radius) {
      this.props.inZone(true, pointsOfInterest[0]);
    }
  }
  componentWillUnmount() {
    this.watchId.remove(); // stop watching for location changes
  }
  markerInputFn = (onPressInfo) => {
    this.props.callbackFromParentInput(onPressInfo);
  }
  markerCoordsFn = (onPressLatitude, onPressLongitude) => {
    this.props.callbackFromParentCoords(onPressLatitude, onPressLongitude);
  }
  render() {
    return (
      // initialRegion sørger for at mapped ikke hele tiden zoomer tilbage til start positionen når det opdateres
      <MapView style={styles.mapStyle} initialRegion={this.props.mapRegion} onLongPress={(e) => {
        this.markerInputFn(true),
          this.markerCoordsFn(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
      }}>

        <Marker coordinate={this.props.userMarker}>
          <Image source={require('../assets/userMarker.png')} style={{ width: 50, height: 50 }} />

        </Marker>
        {this.props.switchValue ?

          <Circle
            center={this.props.userMarker}
            radius={this.props.sliderValue * 1000}
            strokeWidth={2}
            strokeColor='blue'
            fillColor='rgba(100,100,200,0.5)'
          />

          :
          null
        }

        {pointsOfInterest.map((p, index) => (
          // Create new temporary array with each of the the points of interest turned into individual
          //Markers in the new array. The new temporary array of Markers is hereafter displayed  as Markers on the map              
          <Fragment>
            <Marker
              key={index}
              coordinate={p.coords}
              title={p.whatis}
            >

              <Image source={(this.props.switchValue == true && p.currentDistance < p.radius + this.props.sliderValue * 1000) ?
                (require('../assets/greenApple.png'))
                :
                (require('../assets/apple1.png'))}
              />
            </Marker>
            {this.props.switchValue == true && p.currentDistance < p.radius + this.props.sliderValue * 1000 ?
              <Circle

                center={p.coords}
                radius={p.radius}
                strokeWidth={2}
                strokeColor='green'
                fillColor='rgba(100,200,100,0.5)'
              />
              :
              null
            }
            {this.props.switchValue == true && p.currentDistance > p.radius + this.props.sliderValue * 1000 ?
              <Circle

                center={p.coords}
                radius={p.radius}
                strokeWidth={2}
                strokeColor='red'
                fillColor='rgba(200,100,100,0.5)'
              />
              :
              null
            }
          </Fragment>
        ))}
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


