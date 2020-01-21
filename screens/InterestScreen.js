import * as React from 'react';
import { Button, Image, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

export default class InterestScreen extends React.Component {
  state = {
    images: [],
  };

  componentWillMount() {
    this.getImageId();
  }

  getImageId = async () => {
    var currentZoneText = this.props.navigation.state.params.what;
    console.log('currentZoneText: ' + currentZoneText);
    let imageId;

    try {
      imageId = await AsyncStorage.getItem('imageId') || 'none';

      this.setState({ images: this.state.images.concat(imageId) });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return imageId;
  }

  componentDidMount() {
    this.getPermissionAsync();
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
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ images: this.state.images.concat(result.uri) });
      this.saveImageId(result.uri);
    }
  };

  saveImageId = async imageId => {
    try {
      await AsyncStorage.setItem('imageId', imageId);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
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

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this._pickImage}
        >
          <Text style={styles.btnText}>
            camera roll
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollView} >
          {this.showImages()}
        </ScrollView>

        <Text style={styles.header}>{params.what}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  scrollView: {

  },
  header: {
    padding: '5%',
    fontSize: 36,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(255, 202, 0)',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5,
  },
  imageView: {
    width: null,
    height: null,
    borderColor: '#dddddd',
  },
  image: {
    marginTop: '2%',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    margin: 3,
    aspectRatio: 1, //render it to match is width (fullscreen)
  },
  button: {
    alignSelf: "center",
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#485155',
    borderRadius: 25,
    opacity: .75,
  },
  btnText: {
    color: 'white',
    opacity: 1,
    textTransform: 'uppercase',
  },
})