import React from "react";

import { StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {Colors} from './styles';
const {primary} = Colors;
const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: primary }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    // },
    image: {
      flex: 1,
      justifyContent: "center"
    }
});
export default KeyboardAvoidingWrapper;