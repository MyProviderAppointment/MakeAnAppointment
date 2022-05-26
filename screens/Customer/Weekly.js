import React, { useEffect, useState, useContext } from 'react';
import {Text , View, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { baseAPIUrl } from '../../components/shared';
import axios from 'axios';
import moment from 'moment';
import {
    ButtonText,
    PageTitle,
    StyledButton,
    StyledContainer,
    StyledTextInput,
    StyledFormArea,
    Colors,
    LeftIcon, 
    StyledInputLabel,
    MsgBox,
    DateInfo,
    DatePrevArea,
    DateTitleArea,
    DateTitle,
    DateNextArea,
    DateList,
    DateItem,
    DateItemWeekDay,
    DateItemNumber,
    InnerContainer,
    Line, 
    TimeList,
    TimeItem,
    TimeItemText,
    ModalItem,
	DateAppointments,
	DateAppointmentsItem,
	DateAppointmentsDetails,

} from '../../components/styles';
import { useTheme } from 'styled-components';
import WeekView, { createFixedWeekDate } from '@geisweiller/react-native-week-view';

const { brand, darklight, primary } = Colors;

const Weekly = () => {
    
    const handleDayView = (date) => {
		let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        let selDate = `${year}-${month}-${day}`;
        return selDate;
    }
  

  return (
    <StyledContainer>
		<PageTitle>on this week</PageTitle>
		
    </StyledContainer>
        
  );
}


export default Weekly;

