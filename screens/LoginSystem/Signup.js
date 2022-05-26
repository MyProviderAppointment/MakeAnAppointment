import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

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
    TextLinkContent
} from '../../components/styles';

import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../../components/CredentialsContext';

import { baseAPIUrl } from '../../components/shared';
//Colors
const { brand, darklight, primary } = Colors;

import DateTimePicker from '@react-native-community/datetimepicker';

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    // const [show, setShow] = useState(false);
    // const [date, setDate] = useState(new Date(2000, 0 , 1));
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    // const [dob, setDob] = useState();

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(false);
    //     setDate(currentDate);
    //     setDob(currentDate);
    // }
    // const showDatePicker = () => {
    //     setShow(true);
    // }
    
    const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = `${baseAPIUrl}/user/signup`;
        axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result; 

                if (status !== 'PENDING') {
                    handleMessage(message, status);
                } else {
                    tempUserPersist(({ email, name } = credentials));
                    navigation.navigate('Verification', { ...data }); 
                }
                setSubmitting(false);
            })
            .catch((error) => { 
                console.log(error);
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again")
            });
    }
    const tempUserPersist = async (credentials) => {
        try {
            await AsyncStorage.setItem('MyAppCredentials', JSON.stringify(credentials));
        } catch (error) {
            handleMessage('Error with inintial data handling.');
            console.log(error);
        }
    }
    const handleMessage = (message, type = 'FAILED') =>{
        setMessage(message);
        setMessageType(type);
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>My App</PageTitle>
                    <SubTitle>Account Signup</SubTitle>       
                    <Formik
                        initialValues={{name: '', email: '', phone: '', password: '', confirmPassword: ''}} // ,dateOfBirth: ''
                        onSubmit={(values, {setSubmitting}) => {
                            values = {...values }; // ,dateOfBirth: dob
                            if (values.email == '' || values.password == '' || values.confirmPassword == '' || values.name == '' || values.phone == '' ) { // || values.dateOfBirth == '') {
                                handleMessage('An empty field was detected');
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Password do not match');
                                setSubmitting(false);
                            } else { handleSignup(values, setSubmitting); }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label="Full Name"
                                icon="person"
                                placeholder="Jennifer Aniston"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
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
                                label="Phone Number"
                                // icon="north-star"
                                placeholder="050-1234567"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
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
                            <MyTextInput 
                                label="Confirm Password"
                                icon="lock"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Signup</ButtonText>
                                </StyledButton>
                            )}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}/>
                                </StyledButton>
                            )}
                            <Line />
                            <ExtraView> 
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
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
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} /> 
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;