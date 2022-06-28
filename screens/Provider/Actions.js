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
    TimeList,
    TimeItem,
    TimeItemText,
    ModalItem,
    DateInfo,
    DateNextArea,
    DatePrevArea,
    DateTitleArea
    // CheckBoxContainer,
  } from '../../components/styles';
import { View, StyleSheet,Text, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native';
import CheckBox from 'expo-checkbox';
// icon
import { Octicons, Ionicons , MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
const { darkLight, brand, primary } = Colors;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
import UserList from './UserList';

const Actions = ({visible, setVisible,setReload, setSubmitting, slot_date, slot_start,slot_end, cancel, setCancel, exist, setExist, existData}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    // const [date, setDate] = useState(slot_date);
    // const [start, setStart] = useState(slot_start);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [vis, setVis] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setEmail('');
      setName('');
      setPhone('');
    },[])
    useEffect(() => {
      setTimeout(() => { 
        setLoading(false);
        // setSubmitting(false);
        // console.log(headers);
    }, 3000);
    }, [loading, email, name, phone]);
    const makeTwoDigits = (time) => {
      const timeString = `${time}`;
      if (timeString.length === 2) 
        return time;
      return `0${time}`;
    };
    const handleCancel = async () => {
      handleMessage(null);
      const data = {slot_date, slot_start};
      const url = 'https://young-brushlands-79715.herokuapp.com/appointments/cancelAppointment';
        await axios
            .post(url, data)
            .then((response) => {
            const result = response.data;
            const { status, message, data } = result;
    
            if (status !== 'SUCCESS') 
                handleMessage(message, status);
            
                // setSubmitting(false);
                setVisible(false);
            })
            .catch((error) => {
            //   setSubmitting(false);
            handleMessage('An error occurred. Check your network and try again');
            console.log(error.toJSON());
            });
            // setSubmitting(false);
            setVisible(false);
            setReload(true);
            setSubmitting(true);
        
    };
    const createAnAppointment = async (credentials) => {
      handleMessage(null);
        const email = credentials.email;
        const name = credentials.name;
        const phone = parseInt(credentials.phone);
        const data = {slot_date, slot_start, slot_end, name, phone, email};
        console.log(data);

        const url = 'https://young-brushlands-79715.herokuapp.com/appointments/createAnAppointment';
          await axios
              .post(url, data)
              .then((response) => {
              const result = response.data;
              const { status, message, data } = result;
      
              if (status !== 'SUCCESS') 
                  handleMessage(message, status);
              
                  // setSubmitting(false);
                  setVisible(false);
              })
              .catch((error) => {
              //   setSubmitting(false);
              handleMessage('An error occurred. Check your network and try again');
              console.log(error.toJSON());
              });
              // setSubmitting(false);
              setVisible(false);
              setReload(true);
              setSubmitting(true);
    };

    const makeAnAppointment = async (credentials) => {
        handleMessage(null);
        const email = credentials.email;
        const name = credentials.name;
        const phone = parseInt(credentials.phone);
        const data = {slot_date, slot_start, name, phone, email};
        const url = 'https://young-brushlands-79715.herokuapp.com/appointments/makeAnAppointment';
          await axios
              .post(url, data)
              .then((response) => {
              const result = response.data;
              const { status, message, data } = result;
      
              if (status !== 'SUCCESS') 
                  handleMessage(message, status);
              
                  // setSubmitting(false);
                  setVisible(false);
              })
              .catch((error) => {
              //   setSubmitting(false);
              handleMessage('An error occurred. Check your network and try again');
              console.log(error.toJSON());
              });
              // setSubmitting(false);
              setVisible(false);
              setReload(true);
              setSubmitting(true);
    };
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };
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
      <>
      <Modal animationType='slide' visible={visible} transparent={true} >
        <ModalContainer>
        
          {!loading && ( 
            <ModalView>
            {!exist && (
            <Formik
              initialValues={{ name: name, phone: phone, email: email}}
              onSubmit={(values, { setSubmitting }) => {
                values = { ...values};
                if (values.name == '' && values.phone == ''&& values.email == '') {
                  createAnAppointment(values); 
                } else if (values.name == '' || values.phone == '') {
                  handleMessage('Please fill in fields');
                  setSubmitting(false);
                } else {  
                  if (cancel) makeAnAppointment(values);  
                  else {
                    console.log(values);
                    setEmail(values.email);
                    setName(values.name);
                    setPhone(values.phone);
                    createAnAppointment(values);
                  }      
                }   
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <>
               <RightIcon onPress = {() => {
                setEmail('')
                setName('')
                setPhone('')
                setVisible(false)
                }}>
                 <Octicons name={"sign-out"} size={30} color={"#000000"}/>
              </RightIcon>
                <StyledFormArea style={{ marginTop: 25}}>
                  
                  <ExtraView> 
                      <TextLink onPress={(credentials) => {
                        setVis(true)
                        setEmail(credentials.email)
                        setName(credentials.name)
                        setPhone(credentials.phone)
                      }}>
                        <TextLinkContent>לחץ כאן</TextLinkContent>
                      </TextLink>
                      <ExtraText>כדי לחפש ברשימת המשתמשים</ExtraText>

                  </ExtraView>
                  <MyTextInput
                    label="אימייל"
                    placeholder="israel@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    icon="mail"
                    keyboardType="email-address"

                  />
                    
                  <MyTextInput
                    label="לקוח"
                    placeholder="ישראל ישראלי"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    icon="person"
                  />
                  <MyTextInput
                    label="מספר פלאפון"
                    placeholder="0501234567"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    icon="info"
                  />
                  
                  <MsgBox type={messageType}>{message}</MsgBox>
                  {!isSubmitting && (
                    // <ModalItem>
                    
                    <DateInfo style={{ alignItems: 'center',
                      justifyContent: 'center',
                      }}
                      >
                        <>
                      <DateNextArea style={{ backgroundColor: 'white', width: 50,alignItems: 'center',}} onPress={handleSubmit}>
                        <Octicons name="plus" size={30} color='green' />
                    </DateNextArea>
                    {cancel &&(
                      <>
                      <DateTitleArea></DateTitleArea>
                    <DatePrevArea style={{ backgroundColor: 'white', width: 50, alignItems: 'center'}} 
                    onPress={handleCancel}>
                      <Octicons name="trashcan" size={30} color='red' />
                    </DatePrevArea>
                    </>
                    )}
                    </>
                    </DateInfo>
                  )}
                  {isSubmitting && (
                      <ActivityIndicator size="large" color={primary} />
                  )}
                </StyledFormArea>
                </>
              )}
              </Formik>
            )}

            {exist && (
              <>
               <RightIcon onPress = {() => {
                setEmail('')
                setName('')
                setPhone('')
                setVisible(false)
                }}>
                 <Octicons name={"sign-out"} size={30} color={"#000000"}/>
              </RightIcon>
                <ExtraView> 
                    <ExtraText> {existData[4]} +972-{existData[3]} </ExtraText>
                    <Text> | </Text>
                    <ExtraText> {existData[2]} {existData[0]} {existData[1]} </ExtraText>
                </ExtraView>
                <DateInfo>
                  <DatePrevArea style={{ backgroundColor: 'white', width: 50, alignItems: 'center'}} onPress={handleCancel}>
                    <Octicons name="trashcan" size={30} color='red' />
                  </DatePrevArea>
                </DateInfo>

              </>
            )}
            </ModalView>
          )}
          {/* </ModalView> */}

          

            {loading && (<ActivityIndicator size="large" color='#bad555' />)}
          </ModalContainer>
      </Modal>
      <UserList
        vis={vis}
        setVis={setVis}
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        loading={loading}
        setLoading={setLoading}
      />
      </>

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

export default Actions;

