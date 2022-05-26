import React, { Component, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { VCalendar } from './../../components/VCalendar';
import { DateInfo,
    DatePrevArea,
    DateTitleArea,
    DateTitle,
    DateNextArea,
    DateList,
    ModalItem
} from '../../components/styles';
import { baseAPIUrl } from '../../components/shared';
import axios from 'axios';
import moment from 'moment';
import { Title } from 'react-native-paper';

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
const monthsName = [  
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jule",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const Cal = () => {
    const [listHours, setListHours] =useState([]);
	const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    // const [data,setData] = useState([]);
    const [isSubmitting,setSubmitting] = useState(true);
    const [listDays, setListDays] = useState([]);
    const [tempListDays, setTempListDays] = useState([]);
      const [wrongCredentials,setWrongCredentials] = useState(true);
    // const state = data;

    useEffect(async () => {
        // if (selectedDay == 0 || selectedYear == 0 ) {
            let _today = new Date();
            console.log(_today);
            
            setSelectedYear( _today.getFullYear());
            setSelectedMonth( _today.getMonth());
            setSelectedDay( _today.getDate());
            console.log('day: ', selectedDay);
            console.log('month: ', selectedMonth);
            console.log('year: ', selectedYear);
            
            
    }, []);
    
    useEffect( async () => {
    
        setHeaders(getHeaders());
        const mo = monthsName[selectedMonth];
        const value = {"slot_time": mo};
        await getCalendar(value);
        setTimeout(() => { 
            setSubmitting(false);
            console.log(headers);
        }, 3000);


    }, [isSubmitting, selectedMonth, selectedYear]);

    const getCalendar = async (credentials) => {  
		// let newList = listDays;

		// const newList = () => {getHeaders();};
        let newList = [];
		let tempNewList = [];
        let newListDays = [];
		const url = `${baseAPIUrl}/appointments/getCalendar`; 
		await axios.post(url, credentials)
			.then((response) => {
				const result = response.data;
				const {message, status, data} = result; 
				if (status == 'SUCCESS') { 
					// console.log(data);
					const arr = data.DaysRecords;
					for (let index = 0; index < arr.length; index++) {
						const array = arr[index].slot_time; 
                        let date = new Date(arr[index].slot_date);
                        let selDate = handleDayView(date);
                        tempNewList = [];
						for (let i = 1; i < array.length; i++) {
                            // let e = array[i].slot_start.split(':');
                            // const slot_end = ` ${e[0]}:00:00`
                            tempNewList.push({
                                start: `${selDate} ${array[i-1].slot_start}:00`,
                                end: `${selDate} ${array[i].slot_start}:00`,
                                title:  array[i].available ? 'Free' : `${array[i].name} שם:`,
                                summary: array[i].available ? 'Free' : `${array[i].phone} טל':`,
                                color: array[i].available ? 'green' : '#2cc7ad',
                            });
                        
                        } 
                        console.log(`${date.getDate()} ${days[date.getDay()]}`);  
                        newList.push({
                            Title: `${date.getDate()} ${days[date.getDay()]}`,
                            events: tempNewList,
                        });
                        newListDays.push(selDate);
                    }
                    // console.log(newList);
                    // console.log(newListDays);

				}
                setListDays(newListDays);
                setListHours(newList);

			})
			.catch((error)=> {
				console.log("problem in fetching data: ", error);
                setSubmitting(false);

			});
	}
    const handleLeftDateClick = () => {
        let monthDate = new Date(selectedYear, selectedMonth, 1);
        setSubmitting(true);
        setListDays([]);
        setListHours([]);
        monthDate.setMonth(monthDate.getMonth() - 1);
        setSelectedYear(monthDate.getFullYear());
        setSelectedMonth(monthDate.getMonth());
        setHeaders([]);
        // setSelectedDay(1);
    }
    const handleRightDateClick = () => {
        let monthDate = new Date(selectedYear, selectedMonth, 1);
        setSubmitting(true);
        setListHours([]);
        setListDays([]);
        monthDate.setMonth(monthDate.getMonth() + 1);
        setSelectedYear(monthDate.getFullYear());
        setSelectedMonth(monthDate.getMonth());
        setHeaders([]);

        // setSelectedDay(1);
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
    
	const getHeaders = () => {
        
        let newListDays = []; 

        // setTimeout((newListDays) => { 
            let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        // let list =  getCalendar(value);
        // console.log(" ----------------------------------------------------------------------------------- ");
        // const mo = monthsName[selectedMonth];
        // const value = {"slot_time": mo};
        // await getCalendar(value);  
            console.log('listDays    -------------------------------------------------------- ' ,listDays);
            // console.log('listDays length   ' ,listDays.length);
            // console.log('listHours -------------------------------------------------------- ', listHours);
            for (let i = 1; i <= daysInMonth; i++) {
                let date = new Date(selectedYear, selectedMonth, i);
                let selDate = handleDayView(date);
                // console.log(listDays.includes(selDate));
                if(listDays.includes(selDate)){
                    console.log(selDate);
                    newListDays.push({
                        // key: selDate,
                        Title: `${i} ${days[date.getDay()]}`,
                        
                        events: listHours[listDays.indexOf(selDate)].events,
                        // events: [
                        //     {
                        //         start: '2020-09-07 08:00:00',
                        //         end: '2020-09-07 08:45:00',
                        //         title: 'Dr. Mariana Lisa',
                        //         summary: '3412 Piedmont Rd NE, GA 3032',
                        //         color: 'green',
                        //     },
                        //     {
                        //         start: '2020-09-07 08:30:00',
                        //         end: '2020-09-07 10:30:00',
                        //         title: 'Dr. Mariana Joseph',
                        //         summary: '3412 Piedmont Rd NE, GA 3032',
                        //     },
                        // ]
                    });
                //     counter-=1;
                } else if (date >= new Date()) {
                    newListDays.push({
                        // key: selDate,
                        Title: `${i} ${days[date.getDay()]}`,
                    }); 
                } 
                // } else if (new Date()) {
                //     newListDays.push({
                //         Title: `${i} ${days[date.getDay()]}`,
                //         // color: 'grey'
                //     });
                // }
                
            } 
            newListDays.push({
                // key: selDate,
                Title: '',
            })
        // }, 5000);
        // if ( listDays.length > 0 ) {
            // console.log("newListDays:                       ", newListDays);
            // setSubmitting(false);
            return newListDays;
        // }
        // return [];
        
    }
    const onNewEvent = (item) => {
        console.log(item)
        const { index, Title, hours } = item
        if (Title != '') {
            const msg = `index=${index}, Title=${Title}, hours=${hours.from}-${hours.to}`
            alert(msg)
        } else {
            alert('wrong')
        }
    }
    const onClickEvent = (item) => {
        console.log(item)
        const msg = `${item.title}\n${item.summary}\n\n${item.start} - ${item.end}`
        alert(msg)
    }
    const [ headers, setHeaders ] =useState([]);

  
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>☆Calendar☆</Text>
        
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
					<DateTitle style={{
                        color: '#000000'

                    }}>{months[selectedMonth]} {selectedYear}</DateTitle>
				</DateTitleArea>
				<DateNextArea  onPress={handleRightDateClick}>
				<Image style={{ width: 35, height: 35}} source={require('../../assets/Icons/next-black.png')}/>
				</DateNextArea>
			</DateInfo>	
            {/* <Text style={styles.instructions}>{`${months[selectedMonth]}  ${selectedYear}`}</Text> */}
            <Text style={styles.welcome}>☆☆☆</Text>
            {(!isSubmitting && (
                <VCalendar
                    onNewEvent={onNewEvent}
                    onClickEvent={onClickEvent}
                    month={selectedMonth}

                    // columnHeaders={headers}
                    columnHeaders={getHeaders()}
                    title= ""
                    hourStart={8}
                    hourEnd={17}
                    showHourStart={8}
                />
         
            ))} 
            {(isSubmitting && (
                <ActivityIndicator size="large" color='#4EADBE'/>
            ))} 
           
        </View>
    );

  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default Cal;