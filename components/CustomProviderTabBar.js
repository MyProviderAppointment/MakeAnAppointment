import React from 'react';
import { Image } from 'react-native';

import {
    TabArea,
    TabItem,
    TabItemCenter,
} from './styles';

const CustomProviderTabBar = ({ state, navigation }) => {
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }
    return (
        <TabArea>
             <TabItemCenter onPress={()=>goTo('Cal')}>
                <Image source={require('../assets/Icons/calendar.png')}/>
            </TabItemCenter>
            <TabItem onPress={()=>goTo('CreateWorkDay')}>
                <Image style={{opacity: state.index===1? 1 : 0.3}} source={require('../assets/Icons/weekly.png')}/>
            </TabItem>
           
            {/* <TabItem onPress={()=>goTo('Setting')}>
                <Image style={{opacity: state.index===4? 1 : 0.3}} source={require('../assets/Icons/setting.png')}/>
            </TabItem> */}

        </TabArea>
    );
}



export default CustomProviderTabBar;