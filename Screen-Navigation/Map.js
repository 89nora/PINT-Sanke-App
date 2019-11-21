import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps';


export default class Map extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <MapView style={styles.mapStyle}  >
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


