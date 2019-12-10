import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import { createBottomTabNavigator, createAppContainer} from 'react-navigation-stack';
//import { createBottomTabNavigator, createAppContainer } from 'react-navigation';



/*
//gets exported to App, which is in charge of rendering the App container.
export const AppNavigator = createStackNavigator(
  {
    Camera: CameraScreen,
    //Map: MapScreen,
    Settings : SettingsScreen
  },
  {
    initialRouteName: 'Camera',
    headerMode: 'none'
  }
);
*/
 //const AppContainer = createAppContainer(AppNavigator);


  
export default class NavigationBar extends Component {
 
  constructor(props) {
    super(props);

  }

    render(){ 
        return(
       
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    buttonContainer: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: '10%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
})

