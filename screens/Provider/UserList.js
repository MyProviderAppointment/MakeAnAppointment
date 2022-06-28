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
  } from '../../components/styles';
import { View, StyleSheet,Text,TextInput, TouchableOpacity,FlatList, ActivityIndicator, Modal } from 'react-native';
// icon
import { Octicons, Ionicons , MaterialIcons } from '@expo/vector-icons';
const { darkLight, brand, primary } = Colors;
// import * as Contacts from 'expo-contacts';
const UserList = ({vis, setVis, name, setName, phone, setPhone, email, setEmail, loading, setLoading}) => {
    const [userList, setUserList] = useState([]);
    const [isSubmitting, setSubmitting] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect( async () => {
        await getUsers();
        // componentDidMount();
    }, [isSubmitting]);
    // const loadContacts = async () => {
    //     const permission  =await ExpoStatusBar.Permissions.askAsync(
    //         Expo.permissions.CONTACTS
    //     );
    //     if(permission.status != 'granted') {
    //         return;
    //     }
    //     const {data} = await Contacts.getContactsAsync({
    //         fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers]
    //     });
    //     setUserList(data);
    //     setContacts(data);
    //     setSubmitting(false);
    // }
    // const componentDidMount = () => {
    //     setSubmitting(true);
    //     loadContacts();
    // }
    const getUsers = async () => {
        handleMessage(null);
        const credentials = {};
        // console.log(credentials);
        const url = 'https://young-brushlands-79715.herokuapp.com/user/getUsers';
        await axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                // console.log(data);
                if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setVisible(false);
                setSubmitting(false);
                } else {
                setUserList(data);
                setContacts(data);
                // setVis(true);
                // handleUserList(data);
                setSubmitting(false);

                }
            })
            .catch((error) => {
            handleMessage('An error occurred. Check your network and try again');
            console.log(error.toJSON());
            });
        
    };
    const handleUserList = (credentials) => {
        let arr = credentials;
        // for 

    };
    const searchUser = (value) => {
        const filter = contacts.filter(
            user => {
                let contactLowercase = (user.name).toLowerCase()
                let searchTermLowercase = value.toLowerCase()
                return contactLowercase.indexOf(searchTermLowercase)> -1
            }
        )
        setUserList(filter);
    }
    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };
    const handleSelect = (item) => {
        setEmail(item.email);
        setName(item.name);
        setPhone(item.phone.toString());
        console.log(item.email, item.phone.toString(), item.name);
        setLoading(true);
        setVis(false);
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setSelected(item.index)} style={{ minHeight: 70, padding: 10, margin: 5 }}> 
            <Text style={{
                color: item.index === selected? '#bad555' : 'red',
                fontSize: 20}}>{item.name}</Text>
            <Text style={{color: 'white', fontWeight: 'bold' }}>{item.phone}</Text>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{item.email}</Text>
            {item.index === selected && (
                <TouchableOpacity style={{ alignItems: 'center'}}onPress={() => handleSelect(item)}>
                 <Octicons name={"fold-up"} size={30} color={"#bad555"}/>
            </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
    
    return (
    <Modal animationType='slide' visible={vis} transparent={true}>
    <ModalContainer >
        <ModalView style={{backgroundColor: '#2f363c'}}>
        <RightIcon onPress = {() => setVis(false)}>
                 <Octicons name={"sign-out"} size={30} color={"#ffffff"}/>
              </RightIcon>
        <TextInput
            placeholder='חיפוש'
            placeholderTextColor='#dddddd'
            style={{ 
                backgroundColor: '#2f363c', 
                height: 50, 
                fontSize: 36,
                width: '80%',
                color: 'white',
                marginTop: 25,
                borderBottomWidth: 0.5,
                borderBottomColor: '#7d90a0'
            }}
            onChangeText={(value) => searchUser(value)}
        />
        {!isSubmitting && (
            <FlatList
                data={userList}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 50
                    }}>
                    <Text style={{ color: '#bad555' }}>No Contants Fount</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={selected}
            >
             
        
            </FlatList>
            
        )}
        {isSubmitting && (
            <View style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color='#bad555' />
            </View>
        )}
        </ModalView>
        {/* <StyledButton onPress={() => setVis(false)}>
                <ButtonText>ביטול</ButtonText>
            </StyledButton> */}
        </ModalContainer>
        
        
    </Modal>
    );
}
export default UserList;