
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import {Text , View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {
    ButtonText,
    PageTitle,
    StyledButton,
    StyledContainer,
    StyledTextInput,
    StyledFormArea,
    Colors,
    LeftIcon, 
    StyledInputLabel
} from '../../components/styles';
import { baseAPIUrl } from '../../components/shared';
const { brand, darklight } = Colors;

const Search = () => {

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const url = `${baseAPIUrl}/appointments/getAppointments`;
    const handleMessage = (message, type = 'FAILED') =>{
        setMessage(message);
        setMessageType(type);
    } 
    const day =  "2022-05-22";
    // const GetAppointments = async (credentials) => {
    //     handleMessage(null);  
        // axios.get(url, credentials)
        // .then((response) => {
        //     const result = response.data;
        //     // const {message, status, data} = result; 
        //     // if (status != 'SUCCESS') {
        //     //     handleMessage(message, status);
        //     // }
        //     // else {
        //         console.log(result.data);    
        // })
        // .catch((error)=> {
        //     console.log("problem in fetching data: ", error);
        // })   
    // }
    return (
        <StyledContainer>
            <PageTitle>Make an Appointment</PageTitle>
            {/* <StyledButton onPress={GetAppointments(day)}> */}
            <StyledButton>
                <ButtonText>קבע תספורת</ButtonText>
            </StyledButton>               
        </StyledContainer>
    )
}


export default Search;