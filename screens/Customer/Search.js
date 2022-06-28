
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {Text , View, TouchableOpacity, ActivityIndicator, Image} from 'react-native';

import { CredentialsContext } from '../../components/CredentialsContext';

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
    TimeListV
} from '../../components/styles';
import { baseAPIUrl } from '../../components/shared';

//formik
import { Formik } from 'formik';
import { NavigationContainer } from '@react-navigation/native';

const { background, buttontext, text, space, title, holder, button, icon, brand, darklight, primary } = Colors;
const monthsName = [  
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const months = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר'
];
const days = [
    'ראשון',
    'שני',
    'שלישי',
    'רביעי',
    'חמישי',
    'שישי',
    'שבת'
];

const Search = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const { name, email } = storedCredentials;

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [availableListDays, setAvailableListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    const [isSubmitting, setSubmitting] = useState(true);
    const [isSubmittingg, setSubmittingg] = useState(false);
    
    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    }, []);

    useEffect(async() => {
        let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newListDays = [];
        console.log('--------------------------------------');
        let values = {"slot_month": monthsName[selectedMonth]};
        await getAvailableDays(values);
        console.log(availableListDays);
        for (let i = 1; i <= daysInMonth; i++) {
            let date = new Date(selectedYear, selectedMonth, i);
            let selDate = handleDayView(date);
            if (new Date(selDate) >= Date.now()) {
                newListDays.push({
                    weekday: days[ date.getDay() ],
                    number: i,
                    value: selDate,
                });
            } 
        }
        setListDays(newListDays);
        setSubmitting(false);
        setListHours([]);
        setSelectedHour(0);
    }, [isSubmitting, selectedMonth, selectedYear]);

    const handleLeftDateClick = () => {
        let monthDate = new Date(selectedYear, selectedMonth, 1);
        setSubmitting(true);
        setListDays([]);
        setListHours([]);
        monthDate.setMonth(monthDate.getMonth() - 1);
        setSelectedYear(monthDate.getFullYear());
        setSelectedMonth(monthDate.getMonth());
        setSelectedDay(0)
    }
    const handleRightDateClick = () => {
        let monthDate = new Date(selectedYear, selectedMonth, 1);
        setSubmitting(true);
        setListHours([]);
        setListDays([]);
        monthDate.setMonth(monthDate.getMonth() + 1);
        setSelectedYear(monthDate.getFullYear());
        setSelectedMonth(monthDate.getMonth());
        setSelectedDay(0)
    }
    const handleDayView = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        let selDate = `${year}-${month}-${day}`;
        return selDate;
    }
    const handleMakeAnAppointment = async (day, time) => {
        setSubmittingg(true);
        console.log(`day: ${day} time: ${time}`)
        let date = new Date(selectedYear,selectedMonth, day);
        let selDate = handleDayView(date);
        let values = {
            slot_date: selDate,
            slot_start: time,
            email: email,
        }
        await MakeAnAppointment(values);
    }   
    const handleGetAppointments = async (item) => {
        availableListDays.includes(item.value) ? setSelectedDay(item.number) : setSelectedDay(0)
        let date = new Date(selectedYear,selectedMonth, item.number);
        let selDate = handleDayView(date);
        let values = {slot_date: selDate };
        await getAppointments(values);
    }

    // API connection
    const getAppointments = async (credentials) => {    
        // console.log(credentials);   
        let newListHours = []; 
        const url = `${baseAPIUrl}/appointments/getAppointments`;
        await axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result; 
                if (status == 'EMPTY') {
                    // console.log("empty"); 
                    // setSubmitting(false);  
                    // availableListDays.pop(data)
                    setListHours([]);                 

                } else if (status != 'SUCCESS') {
                    console.log(message, status);
                    // setSubmitting(false); 
                    setListHours([]);                  
                 
                } else {
                    const arr = data.AppointmentsRecords;
                    for (let index = 0; index < arr.length; index++) {
                        console.log(arr[index]);
                        newListHours.push({
                            value: arr[index]
                        });   
                    } 
                    // setSubmitting(false);
                    setListHours(newListHours);
                    
                }
            })
            .catch((error)=> {
                console.log("problem in fetching data: ", error);
                // setSubmitting(false);
            });
    }
    const getAvailableDays = async (credentials) => {  
        let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newList = [];
        const url = `${baseAPIUrl}/appointments/getAvailableDays`; 
        await axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result; 
                if (status == 'SUCCESS') { 
                    // console.log(data);
                    const arr = data.DayRecords;
                    for (let index = 0; index < arr.length; index++) {
                        // console.log(handleDayView(new Date(arr[index])));
                        // console.log('length:        dfdg                    ',arr[index]);
                        // if(arr[index])
                        newList.push(
                            handleDayView(new Date(arr[index]))
                        );   
                    } 
                    setAvailableListDays(newList);
                    // console.log(availableListDays);
                    // console.log(newList);
                }
            })
            .catch((error)=> {
                console.log("problem in fetching data: ", error);
            });
    }
    const MakeAnAppointment = async (credentials) => {
        const url = `${baseAPIUrl}/appointments/makeAnAppointment`; 
        await axios.post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result; 
            if (status == 'SUCCESS') {
                console.log(credentials); 
                setSubmittingg(false);
                // Navigator.navigate('Account');
            }
        })
        .catch((error)=> {
            console.log("problem in fetching data: ", error);
            setSubmittingg(false);
        });
    }

    return (
        <StyledContainer>

            <PageTitle>Make an Appointment</PageTitle>
            <StyledFormArea>
                <ModalItem>
                    <DateInfo>
                        {(new Date(selectedYear, selectedMonth-1, 31) > Date.now()) && (
                        <DatePrevArea onPress={handleLeftDateClick}>
                            <Image style={{ width: 35, height: 35}} source={require('../../assets/Icons/prev-black.png')}/>
                        </DatePrevArea>
                        )}
                        {(new Date(selectedYear, selectedMonth-1, 31) <= Date.now()) && (
                        <DatePrevArea/>
                        )}
                        <DateTitleArea>
                            <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                        </DateTitleArea>
                        <DateNextArea  onPress={handleRightDateClick}>
                           <Image style={{ width: 35, height: 35}} source={require('../../assets/Icons/next-black.png')}/>
                        </DateNextArea>
                    </DateInfo>
                </ModalItem>
                <ModalItem>
                    {!isSubmitting && (
                        <DateList horizontal={true} showsHorizontalScrollIndicator={false} >
                            {listDays.map((item, key) => (
                                <DateItem 
                                    key={key}
                                    style={{
                                        opacity: availableListDays.includes(item.value) ? 1 : 0.3,
                                        backgroundColor: item.number === selectedDay ? '#666b85' : '#ffffff' 
                                    }}
                                    onPress={() => handleGetAppointments(item)} 
                                >
                                    <DateItemWeekDay style={{
                                        color: item.number === selectedDay? '#ffffff' : availableListDays.includes(item.value) ? '#3b3a4f' : '#000000'
                                    }}>{item.weekday}</DateItemWeekDay>
                                    <DateItemNumber style={{
                                        color: item.number === selectedDay? '#ffffff' : availableListDays.includes(item.value) ? '#3b3a4f' : '#000000'
                                    }}>{item.number}</DateItemNumber>
                                </DateItem>
                            ))}
                        </DateList>
                    )}
                    {isSubmitting && (
                        <DateList>
                            <ActivityIndicator size="large" color='#3b3a4f'/>
                        </DateList> 
                    )} 
                </ModalItem>
                <ModalItem>
                    {!isSubmitting && selectedDay > 0 && (
                        <TimeListV>
                         {/* <TimeList horizontal={true} showsHorizontalScrollIndicator={false}> */}
                            {listHours.map((item, key) => (
                                <TimeItem 
                                    key={key}
                                    onPress={() => setSelectedHour(item.value)}
                                    style={{
                                        backgroundColor: item.value === selectedHour ? '#666b85' : '#ffffff' 
                                    }}
                                    >
                                        <TimeItemText style={{
                                            color: item.value === selectedHour? '#ffffff' : '#000000'
                                        }}>{item.value}</TimeItemText>
                                    </TimeItem>
                            ))}
                            
                        </TimeListV>
                    )}
                </ModalItem>
                {!isSubmittingg && (
                <StyledButton onPress={() => handleMakeAnAppointment(selectedDay, selectedHour)}>
                    <ButtonText>קבע תספורת</ButtonText>
                </StyledButton>
                )}
                {isSubmittingg && (
                <StyledButton>
                        <ActivityIndicator size="large" color='#3b3a4f'/>
                </StyledButton>
                )}

            </StyledFormArea> 
             
        </StyledContainer>
    );    
}

export default Search;