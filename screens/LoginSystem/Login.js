import React, {useState, useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { View, ActivityIndicator, Platform,StyleSheet, ImageBackground} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    StyledContainer, 
    InnerContainer, 
    PageLogo, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    LeftIcon, 
    StyledInputLabel, 
    StyledTextInput, 
    RightIcon,
    StyledButton,
    ButtonText, 
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    Container
} from '../../components/styles';

import { baseAPIUrl } from '../../components/shared';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../../components/CredentialsContext';

//Colors
const { brand, darklight, primary, secondary, tertiary, quaternary } = Colors;

const Login = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    // const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    
    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);  
        const url = `${baseAPIUrl}/user/signin`;
        axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result; 
                if (status != 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    perisistLogin({...data[0]}, message, status);
                }
                setSubmitting(false);
            })
            .catch((error) => { 
                console.log(error);
                setSubmitting(false);
                handleMessage('An error ocurred. Check your network and try again');
        })
    }

    const handleMessage = (message, type = 'FAILED') =>{
        setMessage(message);
        setMessageType(type);
    }  

    /* for google sign in

    useEffect(() => {
        initAsync();
    })
    const androidClientId = '333181735770-apj4qofgp31qec6bscsvt0lb46c7evkm.apps.googleusercontent.com';
    const iosClientId = '333181735770-u7qfnhk0aqku65ch2a0a5ej1lv4f1j9k.apps.googleusercontent.com';
    
    
    const initAsync = () => {
        try {
            GoogleSignIn.initAsync({
                clientId: Platform.OS === 'android' ? androidClientId : iosClientId,
            });
        } catch ({message}) {
            console.log("Google sign in error: " + message);
        }
    }

    const getUserDetails = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        setGoogleSubmitting(false);
        user && perisistLogin({...user}, "Google signin successfuly", 'success'); 
    }


    const handleGoogleSignin = async () => {
        try {
            setGoogleSubmitting(true);
            await GoogleSignIn.askForPlayServicesAsync();
            const {type, user} = await GoogleSignIn.signInAsync();
            if (type === "success") {
                getUserDetails();
            } else {
                handleMessage("Google sign in cancelled");
                setGoogleSubmitting(false);
            }
        } catch ({message}) {
            setGoogleSubmitting(false);
            console.log("Google sign error: " + message);
        }
    }

    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: `1040454333288-568mkd60h57lldabpf3e7ap8c9ome4o7.apps.googleusercontent.com`, 
            androidClientId: `1040454333288-i5llh8hj09kr9me72esp08jhrhu93k20.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        };
        Google.logInAsync(config)
        .then((result) => {
            const {type, user} = result;
            if (type == 'success') {
                const {email, name, photoUrl} = user
                perisistLogin({email, name, photoUrl}, message, status);
            } else {
                handleMessage('Google signin was cancelled');
            }
            setGoogleSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            handleMessage('An error ocurred. Check your network and try again');
            setGoogleSubmitting(false);
        });
    };
    */

    const perisistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('MyAppCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            handleMessage('Persisting login failed');
            console.log(error);
        })
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer> 
                    <StatusBar style="dark" />
                    <InnerContainer>
                        <PageLogo resizeMode="center" source={require('../../assets/img/barbershop.png')} />
                        <PageTitle>Make An Appiontment</PageTitle>
                        <SubTitle>Account Login</SubTitle>
                        <Formik
                            initialValues={{email: route?.params?.email, password: ''}}
                            enableReinitialize={true}
                            onSubmit={(values, {setSubmitting}) => {
                                if (values.email == '' || values.password == '') {
                                    handleMessage('An empty field was detected');
                                    setSubmitting(false);
                                } else {
                                    handleLogin(values, setSubmitting);
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="abcde@gmail.com"
                                    placeholderTextColor={darklight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput 
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darklight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>
                                )}
                                <Line />
                                {/* {!googleSubmitting && (
                                    <StyledButton google={true} onPress={handleGoogleSignin}>
                                        <Fontisto name="google" color={primary} size={25}/>
                                        <ButtonText google={true}>Sign in with Google</ButtonText>
                                    </StyledButton>
                                )}

                                {googleSubmitting && (
                                    <StyledButton google={true} disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>
                                )}  */}
                                <ExtraView> 
                                    <ExtraText>Don't have an acoount already? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Signup")}>
                                        <TextLinkContent>Sign Up</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                                {/* <Line /> */}
                                <ExtraView> 
                                    <ExtraText>Forgot your password? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("ForgotPassword")}>
                                        <TextLinkContent>Click here</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
             </StyledContainer>
        </KeyboardAvoidingWrapper>     
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (<View>
        <LeftIcon>
            <Octicons name={icon} size={30} color={tertiary}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary}/>
            </RightIcon>
        )}
    </View>
    );
};

export default Login;