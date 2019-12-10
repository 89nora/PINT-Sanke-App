import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Slider, Switch } from 'react-native';
import {AsyncStorage} from 'react-native';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      sliderValue: 50,
      switchValue: false, 
    }; 

    console.log('RUNNING CONSTRUCTOR SETTINGS'); 
  }

  componentWillMount() { 
   // this.state.switchValue = false; 
    console.log('SettingWillMount_switchValue: ' + this.state.switchValue); 
  }

  //receives a value that is either true or false from toggleSwitch props in render
  toggleSwitch = (value) => {

    try {
      AsyncStorage.setItem('switchValue', JSON.stringify(value)); 
      console.log('runs saveSwitchValue');
    } catch (error) {
      // Error retrieving data 
      console.log(error.message);
    }

    console.log('switchValue11:' + value);    
    this.setState({ switchValue: value }); 
    //this console.log beneath is logging the opposite switchValue: WHY?
    console.log('switchValue1:' + this.state.switchValue);

   // this.saveSwitchValue();
  }

  /*
  saveSwitchValue = async () => {
    try {
      await AsyncStorage.setItem('switchValue', JSON.stringify(this.state.switchValue));
      console.log('runs saveSwitchValue');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  */

  sliderChange = (sliderValue) => {
    this.setState({ sliderValue: parseFloat(sliderValue) })
  }



  render() {
 
    return (
      <View style={styles.container}>

        {this.state.switchValue ?
        <Text> switch is TRUE</Text>
        :
        <Text> switch is FALSE</Text>
        }

        {this.state.switchValue ?
          <View style={styles.toggleContainer}>

            <Text style={{ color: 'black', fontSize: 16, }}>Geofencing is now turned on!</Text>
            <Slider
              style={styles.slider}
              step={1}
              maximumValue={40}
              minimumValue={0}
              onValueChange={this.sliderChange}
              value={this.state.sliderValue}
              disabled={false}
            />
            <Text>Du har valgt en geofence-radius på: {this.state.sliderValue}</Text>
          </View>
          :
          <View style={styles.toggleContainer}>
            <Text style={{ color: 'black', fontSize: 16, }}>Geofencing is turned off</Text>
          </View>
        }
        <View style={styles.toggleContainer}>
        <Switch
          value = {this.state.switchValue}
          onValueChange = {this.toggleSwitch}
          />
        </View>
        <Text style={styles.paragraph}>SETTINGS</Text>
      </View>
    )
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