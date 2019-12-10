import React from 'react';
import Screens from './Screens.js';
import { TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image, StyleSheet } from 'react-native';
import MapScreen from './MapScreen.js';
import CameraScreen from './CameraScreen.js';
import SettingsScreen from './SettingsScreen.js';

//TAB NAVIGATOR - THIS SCRIPT NOW BELONGS TO REACT-NAVIGATION-TABS

export default createAppContainer(createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      
      navigationOptions: {
        
        title: 'Map',

        tabBarIcon: ({  }) => (

          <Image source={require('./assets/Group1.png')} size={36}  />

        ),

      },

      
    },

    Camera: {
      screen: CameraScreen,
      
      navigationOptions: {
        
        title: 'Camera',

        tabBarIcon: ({  }) => (

          <Image source={require('./assets/Group2.png')} size={36}  />

        ),

      },

      
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
 
        tabBarIcon: ({  }) => (

          <Image source={require('./assets/Group3.png')} size={36} />

        ),

      }
    }
    /*
    Map: { screen: MapScreen },  
    Settings: { screen: SettingsScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Map') {
          iconName = require('./assets/Group1.png') //`ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = require('./assets/Group2.png')//${focused ? '' : '-outline'}`;
        }
        return (
            <Image
                source={iconName}
                style={{height:36, width:36}, color = {tintColor}}
            />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    */
  }
));

/*
 export const AppNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Map: MapScreen,
    Camera: CameraScreen,
  },
  {
    initialRouteName: 'Map',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <AppContainer >
      </AppContainer>
    )

  }
}
*/
