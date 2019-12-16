import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, CameraRoll, Platform, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class App extends Component {
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
      showPicture: false,
      pictureUri: '',
      //photo: '',
    });
  }

  _pickImage = async () => {
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

