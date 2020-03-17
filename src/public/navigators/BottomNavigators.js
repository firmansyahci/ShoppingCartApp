import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Home from '../../screens/Home'
import Cart from '../../screens/Cart';
import AddProducts from '../../screens/AddProducts';
import History from '../../screens/History';
import Logout from '../../screens/Logout';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="cart-plus" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="History" component={History} options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="chart-bar" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="Logout" component={Logout} options={{
                tabBarLabel: 'Logout',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="power-off" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    );
}

export default MyTabs;