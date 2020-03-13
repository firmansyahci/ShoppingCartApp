import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Home from '../../screens/Home'
import Cart from '../../screens/Cart';
import AddProducts from '../../screens/AddProducts';
import History from '../../screens/History';
import Logout from '../../screens/Logout';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Logout" component={Logout} />
        </Tab.Navigator>
    );
}

export default MyTabs;