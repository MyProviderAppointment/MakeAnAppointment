import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

import { 
    InnerContainer, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage, 
    Avatar,
} from './../components/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/CredentialsContext';

import * as GoogleSignIn from 'expo-google-sign-in';
const Welcome = () => {
    
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const { name, email, photoUrl} = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/img2.jpg');


    /* for google sign in

    name = name ? name : displayName;

    const clearLogin = async () => {
        try {
            if (!__DEV__) {
                await GoogleSignIn.signOutAsync();
                await AsyncStorage.removeItem('MyAppCredentials')
            } else {
                await AsyncStorage.removeItem('MyAppCredentials')
            }
            setStoredCredentials("");
        } catch ({message}) {
            alert("Logout Error: "+ message);
        }
    };
    */

    const clearLogin = () => {
        AsyncStorage.removeItem('MyAppCredentials')
        .then(() => {
            setStoredCredentials("");
        })
        .catch((error) => console.log(error));
    };

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/img1.jpg')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                    <SubTitle welcome={true}>{name || 'Jennifer Aniston'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'jenniferaniston@gmail.com'}</SubTitle>

                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={AvatarImg} />
                        
                        <Line />
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>                        
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}



export default Welcome;