import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';

export default class CameraScreen extends Component {
    constructor(props) {
      super(props);
      this.state =
        {
  
        };
    }
  
    render() {
      return (
        <View style={styles.container}>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column-reverse',
      alignItems: 'center',
      backgroundColor: '#FFCA00',
    },
    toggleContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: '10%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    paragraph: {
      color: 'black',
      fontSize: 68,
      textAlign: 'center'
    },
    slider: {
      width: '50%',
    }
  
  })