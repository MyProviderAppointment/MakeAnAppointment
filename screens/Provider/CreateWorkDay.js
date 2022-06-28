import React, { useState, useContext, useEffect } from 'react';
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
    ModalView,
    ModalContainer,
    DateNextArea,
    DateInfo,
    Repeat,
    // CheckBoxContainer,
  } from '../../components/styles';
import { View, StyleSheet,Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
const { darkLight, brand, primary } = Colors;
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
// icon
import { Octicons, Ionicons , MaterialIcons } from '@expo/vector-icons';
const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const CreateWorkDay = ({visible, setVisible, setSubmitting, setReload}) => {
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

    const [spacious, setSpacious] = useState();
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [cb,setcb] = useState([]);
    const [cbs, setcbs] = useState(false);
    const [cb1, setcb1] = useState(false);
    const [cb2, setcb2] = useState(false);
    const [cb3, setcb3] = useState(false);
    const [cb4, setcb4] = useState(false);
    const [cb5, setcb5] = useState(false);
    const [cb6, setcb6] = useState(false);
    const [cb7, setcb7] = useState(false);
    
    

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
    const handleWorkDay = async (credentials) => {
      handleMessage(null);
      console.log(credentials);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const slot_date = new Date(credentials.workd).toLocaleDateString(undefined, options);
      const slot_start = `${makeTwoDigits(credentials.startd.getHours().toString())}:${makeTwoDigits(credentials.startd.getMinutes().toString())}`;
      const slot_end = `${makeTwoDigits(credentials.endd.getHours().toString())}:${makeTwoDigits(credentials.endd.getMinutes().toString())}`;
      const spacious = parseInt(credentials.spacious);
      const slot_repeat = credentials.repeat;
      const data = {slot_date, slot_start, slot_end, spacious, slot_repeat};
      console.log(data);
      const url = 'https://young-brushlands-79715.herokuapp.com/appointments/providerAppointments';
      await axios
        .post(url, data)
        .then((response) => {
          const result = response.data;
          const { status, message, data } = result;
  
          if (status !== 'SUCCESS') 
            handleMessage(message, status);
          
            setSubmitting(false);
            setVisible(false);
        })
        .catch((error) => {
          setSubmitting(false);
          setVisible(false);
          handleMessage('An error occurred. Check your network and try again');
          console.log(error.toJSON());
        });
        setSubmitting(true);
        setReload(true);
        setVisible(false);

    };
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };
    // const handleReturns = (values, setSubmitting) => {
    //   // let selectedYear = wd.getFullYear();
    //   // let selectedMonth = wd.getMonth();
    //   let selectedYear = values.workd.getFullYear();
    //   let selectedMonth = values.workd.getMonth();
    //   let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
    //   // let newList = [];
    //   console.log(cb);
    //   for (let i = values.workd.getDate(); i <= daysInMonth; i++) {
    //     let date = new Date(selectedYear, selectedMonth, i);
    //     let selDate = handleDayView(date);
    //     if (new Date(selDate) >= Date.now() && cb.includes(days[date.getDay()]) && new Date(selDate) >= values.workd) {
    //       setWorkDay(date);
    //       const data = {selDate, start, end, spacious};
    //       // console.log(values.workd);
    //       handleWorkDay(values, setSubmitting);
    //     } 
    //   }
    // };
    const handleDayView = (date) => {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? '0'+month : month;
      day = day < 10 ? '0'+day : day;
      let selDate = `${year}-${month}-${day}`;
      return selDate;
    };
    return (
      <Modal animationType='slide' visible={visible} transparent={true} >
        <ModalContainer>
          <ModalView>
          <RightIcon onPress = {() => setVisible(false)}>
                 <Octicons name={"sign-out"} size={30} color={"#000000"}/>
              </RightIcon>
            <View 
                      style={styless.checkboxProperty}
                      horizontal={true}
                    >
                        <Octicons name="sync" size={30} color='green' />
                      <CheckBox 
                        style={styless.checkbox}
                        disabled={false}
                        value={cbs}
                        color={cbs ? '#3b3a4f' : undefined}
                        onValueChange={(newValue) => setcbs(newValue)}
                      >
                      </CheckBox>
            </View>
            {cbs && (
              <View 
                style={styless.checkboxContainer}
                vertical={true}
              >
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>ראשון</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb1}
                    color={cb1 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => { 
                      setcb1(newValue);
                      let newList = cb;
                      newList.push('Sunday');
                      setcb(newList);
                    }}
                  />
                </View>
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>שני</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb2}
                    color={cb2 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => {
                    setcb2(newValue)
                    let newList = cb;
                    newList.push('Monday');
                    setcb(newList);
                  }}
                  />
                </View>
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>שלישי</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb3}
                    color={cb3 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => {
                      setcb3(newValue)
                      let newList = cb;
                      newList.push('Tuesday');
                      setcb(newList);
                    }}
                  />
                </View>
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>רביעי</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb4}
                    color={cb4 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => {
                      setcb4(newValue)
                      let newList = cb;
                      newList.push('Wednesday');
                      setcb(newList);
                  }}
                    
                  />
                </View>
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>חמישי</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb5}
                    color={cb5 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => {
                      setcb5(newValue)
                      let newList = cb;
                      newList.push('Thursday');
                      setcb(newList);
                    }}
                  />
                </View>
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>שישי</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb6}
                    color={cb6 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => {
                      setcb6(newValue)
                      let newList = cb;
                      newList.push('Friday');
                      setcb(newList);
                  }}
                  />
                </View>
                <View 
                  style={styless.checkboxProperty}
                  horizontal={true}
                >
                  <Text>שבת</Text>
                  <CheckBox 
                    style={styless.checkbox}
                    disabled={false}
                    value={cb7}
                    color={cb7 ? '#3b3a4f' : undefined}
                    onValueChange={(newValue) => {
                      setcb7(newValue)
                      let newList = cb;
                      newList.push('Saturday');
                      setcb(newList);
                  }}
                  />
                </View>
              </View>
            )}
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
              initialValues={{ workd: '', startd: '',endd: '',spacious: '', repeat: []}}
              onSubmit={(values, { setSubmitting }) => {
                values = { ...values, workd: workDay, startd: start, endd: end, repeat: cb};
                if ( values.workd == '' || values.startd == '' || values.endd == '' || values.spacious == '' ) {
                  handleMessage('Please fill in all fields');
                  setSubmitting(false);
                } else {  
                  handleWorkDay(values);
                    // const date = new Date(values.workd.getFullYear(), values.workd.getMonth()+1, values.workd.getDate()+1)
                    // setWorkDay(date);
                  
                } 
                // setSubmitting(false);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="תאריך"
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
                    label="תחילת יום עבודה"
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
                    label="סיום יום עבודה"
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
                    label="זמן פגישה"
                    placeholder="30 (כלומר חצי שעה)"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('spacious')}
                    onBlur={handleBlur('spacious')}
                    value={values.spacious}
                    icon="plus"
                  />
                  <MsgBox type={messageType}>{message}</MsgBox>
                  {!isSubmitting && (
                    <DateInfo style={{ alignItems: 'center', justifyContent: 'center'}}>
                      <Repeat style={{ }} onPress={handleSubmit}>
                        <Octicons name="plus" size={30} color='green' />
                      </Repeat>
                    </DateInfo>
                  )}
                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}
                 
                </StyledFormArea>
              )}
              </Formik>
            </ModalView>
          </ModalContainer>
      </Modal>
      

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


const styless = StyleSheet.create({
  checkboxContainer: { 
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  checkbox: {
      width: 30,
      height: 30,
  },
  checkboxProperty: {
    alignItems: 'center',
    marginRight: 7,  
  }

  
});

export default CreateWorkDay;

