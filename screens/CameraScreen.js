import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, CameraRoll, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermissions: false,
      hasCameraRollPermissions: false,
      ratio: '16:9',
      photo: '',
    };
  }

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraPermissions: status === 'granted',
      hasCameraRollPermissions: status === 'granted',
      photo: '',
    });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => this.onPictureSaved(data.uri));
    }
  }

  onPictureSaved = async photo => {
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
  topBar: {
    flex: 0.1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
  },
  bottomBar: {
    flex: 0.2,
    flexDirection: 'row',
    paddingBottom: 5,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  snapButton: {
    borderColor: 'rgba(0, 0, 0, 0.6)',
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 100,
  }
});


