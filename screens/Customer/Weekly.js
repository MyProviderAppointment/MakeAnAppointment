import React, { useState, useContext } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import moment from 'moment';
import axios from 'axios';
import {
    StyledContainer,
    PageTitle,
    StyledInputLabel,
    StyledFormArea,
    StyledButton,
    StyledTextInput,
    LeftIcon,
    RightIcon,
    InnerContainer,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    SubTitle,
    Colors,
  } from '../../components/styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
const { darkLight, brand, primary } = Colors;
// icon
import { Octicons, Ionicons } from '@expo/vector-icons';
const Weekly = () => {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date());
    const [workDay, setWorkDay] = useState();

    const [showTimeS, setShowTimeS] = useState(false);
    const [startDay, setStartDay] = useState(new Date());
    const [start, setStart] = useState();

    const [showTimeE, setShowTimeE] = useState(false);
    const [endDay, setEndDay] = useState(new Date());
    const [end, setEnd] = useState();

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      setWorkDay(currentDate);
    };
    const onChangeS = (event,selectedStart) => {
      const currentStart = selectedStart;
        setShowTimeS(false);
        setStartDay(currentStart);
        // setHourS(selectedStart.getHour())
        setStart(currentStart);
    };
    const onChangeE = (event, selectedEnd) => {
      const currentEnd = selectedEnd || endDay;
        setShowTimeE(false);
        setEndDay(currentEnd);
        setEnd(currentEnd);
    };
    const showDatePicker = () => {
        setShow(true);
        setMode('date');
    };
    const showTimePickerS = () => {
      setShowTimeS(true);
      setMode('time');
    };
    const showTimePickerE = () => {
      setShowTimeE(true);
      setMode('time');
    };
    const makeTwoDigits = (time) => {
      const timeString = `${time}`;
      if (timeString.length === 2) 
        return time;
      return `0${time}`;
    };
    const handleWorkDay = (credentials, setSubmitting) => {
      handleMessage(null);
      console.log(credentials);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const slot_date = new Date(credentials.workd).toLocaleDateString(undefined, options);
      const slot_start = `${makeTwoDigits(credentials.startd.getHours().toString())}:${makeTwoDigits(credentials.startd.getMinutes().toString())}`;
      const slot_end = `${makeTwoDigits(credentials.endd.getHours().toString())}:${makeTwoDigits(credentials.endd.getMinutes().toString())}`;
      const spacious = parseInt(credentials.spacious);
      const data = {slot_date, slot_start, slot_end, spacious};
      console.log(data);
      const url = 'https://young-brushlands-79715.herokuapp.com/appointments/providerAppointments';
      axios
        .post(url, data)
        .then((response) => {
          const result = response.data;
          const { status, message, data } = result;
  
          if (status !== 'SUCCESS') 
            handleMessage(message, status);
          
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          handleMessage('An error occurred. Check your network and try again');
          console.log(error.toJSON());
        });
    };
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };

    return (
        <StyledContainer>
        {show && (
            <DateTimePicker 
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{
                backgroundColor: 'yellow',
              }}
            />
        )}
        {showTimeS && (
            <DateTimePicker 
              testID="TimePickerS"
              value={startDay}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeS}
              style={{
                backgroundColor: 'yellow',
              }}
            />            
        )}
        {showTimeE && (
            <DateTimePicker 
              testID="TimePickerE"
              value={endDay}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeE}
              style={{
                backgroundColor: 'yellow',
              }}
            />
        )}
        <Formik
            initialValues={{ workd: '', startd: '',endd: '',spacious: ''}}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, workd: workDay, startd: start, endd: end};
              if (
                values.workd == '' ||
                values.startd == '' ||
                values.endd == '' ||
                values.spacious == ''
              ) {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleWorkDay(values, setSubmitting);
              }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                    <MyTextInput
                        label="Date"
                        placeholder="YYYY - MM - DD"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('workDay')}
                        onBlur={handleBlur('workDay')}
                        value={workDay ? workDay.toDateString() : ''}
                        icon="calendar"
                        editable={false}
                        isDate={true}
                        showDatePicker={showDatePicker}
                    /> 
                      
                    <MyTextInput
                        label="Start"
                        placeholder="HH:MM"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('start')}
                        onBlur={handleBlur('start')}
                        value={start ? `${makeTwoDigits(start.getHours().toString())}:${makeTwoDigits(start.getMinutes().toString())}`: ''}
                        icon="chevron-up"
                        editable={false}
                        isStart={true}
                        showTimePickerS={showTimePickerS}
                    /> 
                    <MyTextInput
                        label="END"
                        placeholder="HH:MM"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('end')}
                        onBlur={handleBlur('end')}
                        value={end ? `${makeTwoDigits(end.getHours().toString())}:${makeTwoDigits(end.getMinutes().toString())}`: ''}
                        icon="chevron-down"
                        editable={false}
                        isEnd={true}
                        showTimePickerE={showTimePickerE}
                    />
                      <MyTextInput
                        label="Spacious"
                        placeholder="30 (כלומר חצי שעה)"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('spacious')}
                        onBlur={handleBlur('spacious')}
                        value={values.spacious}
                        icon="plus"
                      />
                        <MsgBox type={messageType}>{message}</MsgBox>

                    {!isSubmitting && (
                      <StyledButton onPress={handleSubmit}>
                        <ButtonText>Create Work Day</ButtonText>
                      </StyledButton>
                    )}
                    {isSubmitting && (
                      <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                      </StyledButton>
                    )}

              </StyledFormArea>
            )}
        </Formik>

        </StyledContainer>
    );
}

const MyTextInput = ({ label, icon, isDate,isStart,isEnd, showDatePicker,showTimePickerS,showTimePickerE, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
  
        {isDate && (
          <TouchableOpacity onPress={showDatePicker}>
            <StyledTextInput {...props} />
          </TouchableOpacity>
        )}
        {isStart && (
          <TouchableOpacity onPress={showTimePickerS}>
            <StyledTextInput {...props} />
          </TouchableOpacity>
        )}
        {isEnd && (
          <TouchableOpacity onPress={showTimePickerE}>
            <StyledTextInput {...props} />
          </TouchableOpacity>
        )}

        {!isEnd && !isStart && !isDate && (
            <StyledTextInput {...props} />
        )}      
        </View>
    );
  };
export default Weekly;

