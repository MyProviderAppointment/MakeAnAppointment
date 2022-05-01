import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    PageTitle,
    InfoText,
    StyledButton,
    ButtonText,
    ModalView,
    ModalContainer,
    Colors, 
} from '../components/styles';

const { primary, green, tertiary, red } = Colors;
const VerificationModal = ({modalVisible, setModalVisible, successful,requestMessage, persistLoginAftetOTPVerification, }) => {
    
    const buttonHandler = () => {
        if (successful) {
            persistLoginAftetOTPVerification();
        }
        setModalVisible(false);
    };

    return (
        <Modal animationType='slide' visible={modalVisible} transparent={true} >
            <ModalContainer>
                {!successful && (
                    <FailedContent buttonHandler={buttonHandler} errorMsg={requestMessage}/>
                )}

                {successful && 
                    <SuccessContent buttonHandler={buttonHandler}/>
                }
            </ModalContainer>
        </Modal>
    );
};

const SuccessContent = ({ buttonHandler }) => {
    return (
        <ModalView>
            <StatusBar style="dark" />
            <Ionicons name="checkmark-circle" size={100} color={green} />
            <PageTitle style={{ fontSize: 25, color:tertiary, marginBottom: 10 }}>
                Verified!
            </PageTitle>
            <InfoText style={{ marginBottom: 15}}>
                Yay! You have successfully verified your account.
            </InfoText>
            <StyledButton 
                style={{ backgroundColor: green, flexDirection: 'row' }}
                onPress={buttonHandler}
            >
                <ButtonText>Continue to App </ButtonText>
                <Ionicons name="arrow-forward-circle" size={25} color={primary} />
            </StyledButton>
        </ModalView>
    );
};

const FailedContent = ({errorMsg, buttonHandler }) => {
    return (
        <ModalView>
            <StatusBar style="dark" />
            <Ionicons name="close-circle" size={100} color={red} />
            <PageTitle style={{ fontSize: 25, color:tertiary, marginBottom: 10 }}>
                Failed!
            </PageTitle>
            <InfoText style={{ marginBottom: 15}}>
                {`Oops! Account verification failed. ${errorMsg}`}
            </InfoText>
            <StyledButton 
                style={{ backgroundColor: red, flexDirection: 'row' }}
                onPress={buttonHandler}
            >
                <ButtonText>Try Again </ButtonText>
                <Ionicons name="arrow-redo-circle" size={25} color={primary} />
            </StyledButton>
        </ModalView>
    );
};

export default VerificationModal;