import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import MyTabs from './BottomNavigators';

const Stack = createStackNavigator();
const MainNavigators = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" headerMode='none'>
                <Stack.Screen name="Home" component={MyTabs} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigators
