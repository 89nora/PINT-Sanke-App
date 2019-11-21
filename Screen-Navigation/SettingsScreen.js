import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default class SettingsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };  
    }
    
    render() {
      return (
        <View style= {styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
              <Image source={require('./assets/Group1.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
              <Image source={require('./assets/Group2.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image source={require('./assets/Group3.png')} />
            </TouchableOpacity >
          </View> 
          <Text style= {styles.paragraph}>SETTINGSsss</Text>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column-reverse', 
      alignItems: 'center',
    },
    buttonContainer: {
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
  
  })