import React, { Component } from 'react'
import { View, Switch, StyleSheet } from 'react-native'

export default SwitchExample = (props) => {
    
    return (
        <Switch
            style={styles.switch}
            onValueChange={props.toggleSwitch}
            value={props.switchValue} />
    )
}
const styles = StyleSheet.create({
    switch: {

        marginRight: 30,
    }
})