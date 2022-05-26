
import React, {useContext, useState, useEffect} from 'react';
import { Text, ActivityIndicator } from 'react-native';
import {
    ModalItem,
    PageTitle,
    StyledContainer,
    StyledFormArea,
    StyledTextInput,
    AppointmentsList,
    AppointmentsItem,
    AppointmentsWeekDay,
    AppointmentsTime,
} from '../../components/styles';
import { CredentialsContext } from '../../components/CredentialsContext';
import { baseAPIUrl } from '../../components/shared';
import axios from 'axios';

const Account = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const { name, email } = storedCredentials;

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    // const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [appointmentsList, setAppointmentsList] = useState([]);
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
        if (isSubmitting){
        let newListDays = [];
        console.log('--------------------------------------');
        let values = {"email": email};
        const MyAppointments = await getMyAppointments(values);
        // console.log(availableListDays[0].slot_start);
        // console.log(availableListDays);
        // for (let i = 0; i <= availableListDays.length; i++) {
        //     let date = new Date(availableListDays[i].slot_date);
        //     let selDate = handleDayView(date);
        //     // if (new Date(selDate) >= Date.now()) {
        //         newListDays.push({
        //             weekday: days[ date.getDay() ],
        //             number: date.getDay(),
        //             time: availableListDays[i].slot_start,
        //         });
        //     // } 
        // }
    }
        // setListDays(newListDays);
        // setSubmitting(false);
        // setListHours([]);
        // setSelectedHour(0);
    }, [isSubmitting]);

    const getMyAppointments = async (credentials) => {  
        let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newList = [];
        const url = `${baseAPIUrl}/appointments/getMyAppointments`; 
        await axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result; 
                if (status == 'SUCCESS') { 
                    // console.log(data);
                    const arr = data.MyAppointmentsRecords;
                    for (let index = 0; index < arr.length; index++) {
                        // console.log(handleDayView(new Date(arr[index])));
                        // let date = new Date(arr[index].slot_date);
                        // let selDate = handleDayView(date);
                        // newList.push(arr[index]);   
                        newList.push({
                            weekday:arr[index].slot_date,
                        //     number: date.getDay(),
                            time: arr[index].slot_start,
                        });
                    } 
                    console.log(newList);
                    setListDays(newList);
                    // console.log(availableListDays);
                }
                setSubmitting(false);

            })
            .catch((error)=> {
                console.log("problem in fetching data: ", error);
                setSubmitting(false);

            });

    }
    return (
        <StyledContainer>
            <PageTitle>My Appointments</PageTitle>
            <StyledFormArea>
                {/* <ModalItem> */}
                {!isSubmitting && (
                        <AppointmentsList horizontal={false} >
                            {listDays.map((item, key) => (
                                <AppointmentsItem 
                                    key={key}
                                    onPress={() => {}}
                                >
                                    <AppointmentsTime>מתקיימת לך פגישה בתאריך: {item.weekday}      בשעה: {item.time} </AppointmentsTime>
                                </AppointmentsItem>
                            ))}
                        </AppointmentsList>
                    )}
                    {isSubmitting && (
                        <AppointmentsList>
                            <ActivityIndicator size="large" color='#4EADBE'/>
                        </AppointmentsList> 
                    )}
                {/* </ModalItem> */}
            </StyledFormArea>
        </StyledContainer>
    )
}

export default Account;