import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

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
    Avatar
} from './../components/styles';

const Home = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/img1.jpg')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                    <SubTitle welcome={true}>Jennifer Aniston</SubTitle>
                    <SubTitle welcome={true}>jennifer_aniston@gmail.com</SubTitle>

                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/img/img2.jpg')} />
                        
                        <Line />
                        <StyledButton onPress={() => navigation.navigate('Login')}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>                        
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}



export default Home;