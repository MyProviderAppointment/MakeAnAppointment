import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
// import Home from '../screens/Customer/Home';
// import Account from '../screens/Customer/Account';
// import Search from '../screens/Customer/Search';
// import Weekly from '../screens/Customer/Weekly';
// import Setting from '../screens/Customer/Setting';
import CreateWorkDay from '../screens/Provider/CreateWorkDay';
import Cal from '../screens/Provider/Cal';

import CustomProviderTabBar from '../components/CustomProviderTabBar';
import { CredentialsContext } from '../components/CredentialsContext';
import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;
const Tab = createBottomTabNavigator();

const RootProviderTab = ({navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email, photoUrl} = storedCredentials;
    return (
            <Tab.Navigator tabBar={props=><CustomProviderTabBar {...props} />} 
            screenOptions={{
                headerStyled: {
                    backgroundColor: 'transparent'
                },
                headerTintColor:  tertiary,
                headerTransparent: true,
                headerTitle: '',
            }}
            initialRouteName="Cal"
            > 
                {/* <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Account" component={Account}/>
                <Tab.Screen name="Search" component={Search}/>
                <Tab.Screen name="Weekly" component={Weekly}/>
                <Tab.Screen name="Setting" component={Setting}/> */}
                <Tab.Screen name="Cal" component={Cal}/>
                <Tab.Screen name="CreateWorkDay" component={CreateWorkDay}/>
            </Tab.Navigator>
    );

}

export default RootProviderTab;