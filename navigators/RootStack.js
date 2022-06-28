import React from 'react';

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Roots from './Roots';
import RootTab from './RootTab';
import RootProviderTab from './RootProviderTab';
import Login from './../screens/LoginSystem/Login';
import Signup from './../screens/LoginSystem/Signup';
import Verification from './../screens/LoginSystem/OtpVerification';

import { CredentialsContext } from './../components/CredentialsContext';
import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor:  tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20,
                            },
                        }}
                        initialRouteName="Login"
                    >
                    {storedCredentials ? (
                        <Stack.Screen options={{ headerTintColor: primary}} name="RootTab" component={RootTab}/>
                        // <Stack.Screen options={{ headerTintColor: primary}} name="RootProviderTab" component={RootProviderTab}/>
                        // <Stack.Screen options={{ headerTintColor: primary}} name="Roots" component={Roots}/>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login}/>
                            <Stack.Screen name="Signup" component={Signup}/>   
                            <Stack.Screen name="Verification" component={Verification}/>
                            <Stack.Screen name="Roots" component={Roots}/>
                            <Stack.Screen name="RootTab" component={RootTab}/>
                            <Stack.Screen name="RootProviderTab" component={RootProviderTab}/>
                        </>
                    )}        
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
        
    )
}

export default RootStack;