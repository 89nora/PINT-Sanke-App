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

 /** 
  * skal fjernes
  * _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
**/
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

    /*if (Platform.OS === 'android') {
      RNFetchBlob
        .config({
          fileCache: true,
          appendExt: 'jpg'
        })
        .fetch('GET', image.urls.small)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then(Alert.alert('Success', 'Photo added to camera roll!'))
            .catch(err => console.log('err:', err))
        })
    } else*/ {
      console.log("PhotoURI: " + photo);
      CameraRoll.saveToCameraRoll(photo, 'photo')
        .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }
/* 

{this.state.showPicture ? (
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            ) : (
                <Camera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={styles.camera}
                  type={Camera.Constants.Type.back}
                //ratio={this.state.ratio}
                //onCameraReady={this.collectPictureSizes}
                >
                </Camera>
              )}


*/
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
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
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

/* import React, { Component } from 'react';
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

  }) */