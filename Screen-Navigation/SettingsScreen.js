import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Slider } from 'react-native';
import SwitchExample from './Switch.js';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true,
      sliderValue: 50,
    }; 
  }

  //receives a value that is either true or false from toggleSwitch props in render?
  toggleSwitch = (value) => {
    this.setState({ switchValue: value })
    console.log('Switch is: ' + value)
  }

  sliderChange = (sliderValue) => {
    this.setState({ sliderValue: parseFloat(sliderValue) })
  }

 
  render() {
    console.log('switch start: ' + this.state.switchValue);
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Map', {switchValue: this.state.switchValue}) }>
            <Image source={require('./assets/Group1.png')} />
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
            <Image source={require('./assets/Group2.png')} />
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
            <Image source={require('./assets/Group3.png')} />
          </TouchableOpacity >
        </View>

        {this.state.switchValue ?
          <View style={styles.toggleContainer}>

            <Text style={{ color: 'black', fontSize: 16, }}>Geofencing is now turned on!</Text>
            <Slider
              style={styles.slider}
              step='1'
              maximumValue='40'
              minimumValue='0'
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

          <SwitchExample toggleSwitch={this.toggleSwitch}
            switchValue={this.state.switchValue} />
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