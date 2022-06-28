import React from 'react';

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
// import RootTab from './RootTab';
// import RootProviderTab from './RootProviderTab';


import { CredentialsContext } from './../components/CredentialsContext';
import { ButtonText, Colors, InnerContainer, StyledButton, StyledContainer } from '../components/styles';
const {primary, tertiary} = Colors;
// const Stack = createNativeStackNavigator();


const Roots = ({navigation}) => {
    return (
       <StyledContainer>
           <InnerContainer>
                <StyledButton onPress={() => navigation.navigate("RootProviderTab")}>
                        <ButtonText>נותן שירות</ButtonText>
                </StyledButton>
                <StyledButton onPress={() => navigation.navigate("RootTab")}>
                        <ButtonText>לקוח</ButtonText>
                </StyledButton>
           </InnerContainer>
       </StyledContainer>
        
    )
}

export default Roots;