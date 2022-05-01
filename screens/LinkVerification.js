import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyledContainer, TopHalf, BottomHalf, IconBg, Colors, PageTitle, InfoText, EmphasizeText, StyledButton, ButtonText, InlineGroup, TextLink, TextLinkContent } from '../components/styles';

import { Octicons, Ionicons } from '@expo/vector-icons';

import { View } from 'react-native';

import ResendTimer from './../components/ResendTimer';

const { brand, primary } = Colors;

const Verification = ({navigation, route}) => {

    const [resendingEmail, setResendingEmail] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');

    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const [activeResend, setActiveResend] = useState(null);
    let resendTimerInterval;

    const { email, userId } = route?.params;

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference / 1000));
        } else {
            setTimeLeft(null);
            clearInterval(resendTimerInterval);
            setActiveResend(true);
        }
    };

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimerInterval = setInterval(() => (
            calculateTimeLeft(finalTime), 1000
        ));
    };

    useEffect(() => {
        triggerTimer();
        
        return () => {
            clearInterval(resendTimerInterval);
        };
    }, []);

    const resendEmail = async () => {

    };

    return (
        <StyledContainer
            style={{
                alignItems: 'center',
            }}
        >
            <TopHalf>
                <IconBg>
                    <StatusBar style="dark" />
                    <Octicons name="mail-read" size={125} color={brand} />
                </IconBg>
            </TopHalf>
            <BottomHalf>
                <PageTitle color={brand} style={{ fontSize: 25 }}>Account Verification</PageTitle>
                <InfoText>
                    Please verify your email!
                    <EmphasizeText>{`${email}`}</EmphasizeText>
                </InfoText>
                <StyledButton onPress={() => navigation.navigate('Login', { email: email})}
                    style={{backgroundColor: brand, flexDirection: 'row' }}
                >
                    <ButtonText>Proceed </ButtonText>
                    <Ionicons name="arrow-forward-circle" size={25} color={primary} />
                </StyledButton>
                <ResendTimer 
                    activeResend={activeResend}
                    resendingEmail={resendingEmail}
                    resendStatus={resendStatus}
                    timeLeft={timeLeft}
                    targetTime={targetTime}
                    resendEmail={resendEmail}
                />
            </BottomHalf>
        </StyledContainer>
    );
};



export default Verification;