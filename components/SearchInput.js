import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import PropTypes from 'prop-types';


export default class SearchInput extends React.Component {

  //Property transformation from Babel allows simplified constructor.
  state = {
    text: '',
  };




  //only stores the data inside text prop
  handleChangeTextCallBack = (text) => {
    this.props.callbackOnChangeText(text);

    this.setState({ text: text });
    console.log('UPDATED: ' + this.state.text);
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
SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
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
    //flex: 1,
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

    //height: 40,
    width: '80%',
    marginTop: '80%',
    //marginHorizontal: 20,
    //paddingHorizontal: 10,
    borderRadius: 5,

  },

});
