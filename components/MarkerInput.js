import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import PropTypes from 'prop-types';


export default class MarkerInput extends React.Component {

  state = {
    text: '',
  };


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


  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={this.props.placeholder} 
          placeholderTextColor="white"
          style={styles.textInput}
          onChangeText={this.handleChangeTextCallBack}
          onSubmitEditing={this.handleSubmitEditing}
          clearButtomMode="always"
        />
        <Text style={styles.header}>Give your secret spot a name</Text>

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

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: '5%',
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
