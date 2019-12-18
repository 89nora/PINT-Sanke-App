import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, CameraRoll, Platform, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
//import * as ImagePicker from 'expo-image-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermissions: false,
      hasCameraRollPermissions: false,
      ratio: '16:9',
      photo: '',
      //image: null, 
    };
  }

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraPermissions: status === 'granted',
      hasCameraRollPermissions: status === 'granted',
      //pictureUri: '',
      photo: '',
    });
  }

  collectPictureSizes = async () => {
    ratios = await this.getRatios();
    console.log(ratios);
  }

  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatiosAsync();
    return ratios;
  }

  takePicture = () => {
    if (this.camera) {
      //console.log("PHOTO: " + this.camera.takePictureAsync().then(data => console.log(data.uri)));
      this.camera.takePictureAsync().then(data => this.onPictureSaved(data.uri));
    }
  }

  onPictureSaved = async photo => {
    this.setState({
 
     //pictureUri: photo,
     // image: photo,
    });
    {
      console.log("PhotoURI: " + photo);
      CameraRoll.saveToCameraRoll(photo, 'photo')
        .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
        </View>
        {this.state.hasCameraPermissions ? (
          <View style={styles.cameraContainer}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.camera}
              type={Camera.Constants.Type.back}
            ratio={this.state.ratio}
            //onCameraReady={this.collectPictureSizes}
            >
            </Camera>
          </View>
        ) : null
        }
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.snapButton}
            onPress={this.takePicture}
          >
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "space-between",
    aspectRatio: 9 / 16,
  },
  bottomBar: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  snapButton: {
    borderColor: 'rgba(255, 202, 0, 0.6)',
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 100,
  }
});