import React from 'react';
import { Image } from 'react-native';

import {
    TabArea,
    TabItem,
    TabItemCenter,
} from './styles';

const CustomTabBar = ({ state, navigation }) => {
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }
    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <Image style={{opacity: state.index===0? 1 : 0.3}} source={require('../assets/Icons/home.png')}/>
            </TabItem>
            <TabItem onPress={()=>goTo('Account')}>
                <Image style={{opacity: state.index===1? 1 : 0.3}} source={require('../assets/Icons/account.png')}/> 
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Search')}>
                <Image source={require('../assets/Icons/calendar.png')}/>
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Weekly')}>
                <Image style={{opacity: state.index===3? 1 : 0.3}} source={require('../assets/Icons/weekly.png')}/>
            </TabItem>
            <TabItem onPress={()=>goTo('Setting')}>
                <Image style={{opacity: state.index===4? 1 : 0.3}} source={require('../assets/Icons/setting.png')}/>
            </TabItem>
            <TabItem onPress={()=>goTo('Cal')}>
                <Image style={{opacity: state.index===5? 1 : 0.3}} source={require('../assets/Icons/calendar.png')}/>
            </TabItem>
        </TabArea>
    );
}



export default CustomTabBar;