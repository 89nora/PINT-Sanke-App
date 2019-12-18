import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { getRhumbLineBearing } from 'geolib';

export default class MarkerInput extends React.Component {

  state = {
    text: '',
  };

  //only stores the data inside text prop
  handleChangeTextCallBack = (text) => {
    //both sends back info to parent component and sets state inside MarkerInput
    this.props.callbackOnChangeText(text);
    this.setState({ text: text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: '' });
  };

  //TextInput has several props, props can be objects, properties or functions.
  //Bind makes sure the handleChangeText method is binded to the TextInput component.
  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Give your secret spot a name</Text>

          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            value={text}
            placeholder={this.props.placeholder} 
            placeholderTextColor="white"
            onChangeText={this.handleChangeTextCallBack}
            onSubmitEditing={this.handleSubmitEditing}
            clearButtomMode="always"
          />
        </View>
      </View>
    );
  }
}

//helps validating the props given to this component. Making sure there of the right type.
MarkerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

MarkerInput.defaultProps = { 
  placeholder: '',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white',
    fontSize: 16,
    alignItems: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    position: 'absolute',
    width: '100%',
    color: 'black',
    backgroundColor: 'rgba(100,100,100,0.5)',
    borderRadius: 5,
  },
  container: {
    justifyContent: 'space-between', 
    flexDirection: 'column-reverse',
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(50,50,50,0.5)',
    padding: '20%',
    alignItems: 'center',
   marginLeft: '10%',
   marginRight: '10%',
    width: '80%',
    marginTop: '80%',
    borderRadius: 5,

  },

});
