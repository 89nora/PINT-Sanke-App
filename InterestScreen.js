import * as React from 'react';
import { Button, Image, View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    images: [],
  };

  render(){
    const { params } = this.props.navigation.state;

      return(
        <View style={styles.container}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <ScrollView style={styles.scrollView} >
      {this.showImages()}
      </ScrollView>
      <Text style={styles.header}>{'Welcome to the secret spot of ' + params.what  }</Text>
      </View>
      );
  }

/*
  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
*/
  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
      //last update version
    });

    console.log(result);

    if (!result.cancelled) {
        this.setState({images: this.state.images.concat(result.uri)});

      //this.setState({ image: result.uri });
    }
  };

  showImages = () => {
    let temp_image = [];
    this.state.images.map((item, index) => {
      let tempKey = item + '123'; //we push the temp image onto the list
      temp_image.push(
        <View key={tempKey}>
          <View
            key={index}
            style={styles.imageView}
          >
            <Image
              key={index}
              source={{ uri: item }}
              style={styles.image}
            />
          </View>
        </View>
      );
    });
    console.log('state images: ', this.state.images);

    return temp_image;
  };
}

/*
import React, { Component } from 'react';
import { Text, StyleSheet, Image, View,Button, CameraRoll, ScrollView  } from 'react-native';

//import AuthorRow from './AuthorRow.js';

export default class InterestScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            photos: [],
        }
    }
    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             //Error Loading Images
          });

        };

        componentDidMount() {
            console.log('this is the current loaded image :' + this.state.photos[0]);

        }

     render() {
      return (
        <View style= {styles.container}>
          <Button style= {styles.button} title="Load Images" onPress={this._handleButtonPress} />
          <ScrollView>
            {this.state.photos.map((p, i) => { 
            return (
              <Image
                key={i}
                style={styles.image}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
          </ScrollView>
        </View>
      );
     }
     */

/*
render() {
    return(
<View style={styles.container}>
    <Text>IINSIDE INTEREST POINT</Text>
    <Image style={styles.image} source= {require('./assets/flowers.png')} />
</View>

    );
}
*/
//}


/**
 * 
 *          <View key={index + 1}>
            <TouchableOpacity
              key={index + 2}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '100%'
              }}
              onPress={() => {
                this.removeImage(index);
                this.forceUpdate();
              }}
            >
              <Text
                key={index + 3}
                style={{
                  alignSelf: 'center',
                  color: '#CE3C3E',
                  fontWeight: 'bold'
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse', 
      },
      scrollView: {
      },
      header:{
        paddingTop: '7%',
        fontWeight: 'bold',
        fontSize: 20,
      },
      imageView: {
        width: null,
        height: null,
        borderColor: '#dddddd',
    
      },
    image: {
        marginTop: '2%',
        //flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'silver',
        padding: 5,
        borderRadius: 5,
        //height: null,
        //width: null,
        margin: 3,
        //resizeMode: 'cover',
        aspectRatio: 1, //render it to match is width (fullscreen)
    },
    button: {
        marginTop: '10%',
padding: '10%',
    }
})