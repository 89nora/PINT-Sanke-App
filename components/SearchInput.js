import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import PropTypes from 'prop-types';


export default class SearchInput extends React.Component {

//Property transformation from Babel allows simplified constructor.
state = {
      text: '',
    };




//only stores the data inside text prop
handleChangeText = (text) => {
  const {onChangeText} = this.props;
  this.setState({text: text});
};

handleSubmitEditing = () => {
  const {onSubmit} = this.props;
  const {text} = this.state;

  if (!text) return;

  onSubmit(text);
  this.setState({text: ''});
};


//TextInput has several props, props can be objects, properties or functions.
//Bind makes sure the handleChangeText method is binded to the TextInput component.
render(){
  const style = {color: 'red'};

  const {placeholder} = this.props;
  const {text} = this.state;

  return (
    <View style={styles.container}>
      <TextInput
      autoCorrect = {false}
      value = {text}
      placeholder = {this.props.placeholder}
      placeholderTextColor = "white"
      style = {styles.textInput}
      onChangeText={this.handleChangeText}
      onSubmitEditing={this.handleSubmitEditing}
      clearButtomMode  = "always"
      />
    </View>
  );
}
}

//helps validating the props given to this component. Making sure there of the right type.
SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  textInput: {
  flex: 1,
  color: 'white',
  },
});
