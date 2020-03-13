import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class Logout extends Component {
    componentDidMount() {
        this.removeToken();
        return this.props.navigation.navigate('Login');
    }

    removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token')
        } catch (e) {
            // saving error
        }
    }

    render() {
        // this.removeToken();
        this.props.navigation.navigate('Login');
        return (
            <View>
            </View>
        )
    }
}
