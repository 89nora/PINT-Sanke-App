import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import MapView, { Marker } from 'react-native-maps';


export default class Map extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <MapView style={styles.mapStyle} region = {this.props.mapRegion}  >
                
                
                <Marker coordinate= {this.props.userMarker}/>
            </MapView>
        );
    }
}

const styles = StyleSheet.create({

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});


