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
} from './../components/styles';

import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/CredentialsContext';

import { baseAPIUrl } from '../components/shared';
//Colors
const { brand, darklight, primary } = Colors;

import DateTimePicker from '@react-native-community/datetimepicker';

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(new Date(2000, 0 , 1));
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }
    const showDatePicker = () => {
        setShow(true);
    }
    

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
                    tempUserPersist(({ email, name, dateOfBirth } = credentials))
                    navigation.navigate('Verification', { ...data }); 
                    // perisistLogin({...data}, message, status);
                }
                setSubmitting(false);
            })
            .catch((error) => { 
                console.log(error.JSON());
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again")
        });
    }

    const tempUserPersist = async (credentials) => {
        try {
            await AsyncStorage.setItem(tempUser, JSON.stringify(credentials));
        } catch {
            handleMessage('Error with inintial data handling.');
        }
    }

    const handleMessage = (message, type = 'FAILED') =>{
        setMessage(message);
        setMessageType(type);
    }

    const perisistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('MyAppCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persisting login failed');
        })
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>My App</PageTitle>
                    <SubTitle>Account Signup</SubTitle>
                    
                    
                    {show && (
                    <DateTimePicker 
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    /> 
                )}
                    <Formik
                        initialValues={{name: '', email: '',dateOfBirth: '', password: '', confirmPassword: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            values = {...values, dateOfBirth: dob};
                            if (values.email == '' || values.password == '' || values.confirmPassword == '' || values.name == '' || values.dateOfBirth == '') {
                                handleMessage('An empty field was detected');
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Password do not match');
                                setSubmitting(false);
                            } else {
                                handleSignup(values, setSubmitting);
                            }
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
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
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

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword,
    isDate, showDatePicker,  ...props}) => {
    return (<View>
        <LeftIcon>
            <Octicons name={icon} size={30} color={brand}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        {!isDate && <StyledTextInput {...props} />}
        {isDate && (
            <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
            </TouchableOpacity>
        )}
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darklight}/>
            </RightIcon>
        )}
    </View>
    );
};

export default Signup;