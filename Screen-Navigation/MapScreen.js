import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Animated, ImageBackground, Easing, TouchableOpacity } from 'react-native';
import loading from './Loading.js';
import Map from './Map.js';


export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
    this.spinValue = new Animated.Value(0)
    loading.load(v => this.setState({ loaded: true }));
  }


  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }



  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })


    return (
      this.state.loaded ?
        <View style={styles.container}>
             <Map />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style= {styles.TouchableOpacityButton} onPress={() => this.props.navigation.navigate('Map')}>
              <Image source={require('./assets/Group1.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
              <Image source={require('./assets/Group2.png')} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image source={require('./assets/Group3.png')} />
            </TouchableOpacity >
          </View> 
          <Text style= {styles.paragraph}>MAP</Text>
        </View>

        :

        <ImageBackground style={styles.backgroundImage} source={require('./assets/foodism1.jpg')}  >

          <Animated.Image
            style={{
              marginTop: '25%',
              width: 260,
              height: 233,
              transform: [{ rotate: spin }]
            }}
            source={require('./assets/flowers.png')}
          />

          <Text style={styles.loadText}> Loading...  </Text>

        </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
  },
  buttonContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  loadText: {
    marginBottom: '10%',
    color: 'white',
    fontSize: 28,
    textAlign: 'center'
  },
  paragraph: {
    marginBottom: '35%',
    color: 'black',
    fontSize: 68,
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: 'center',
    width: null,
    height: null,
  }

})