import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from 'react-native-dotenv';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: false,
      token: ''
    }
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'Home' : 'Login');
  }

  validateUser = async () => {
    try {
      const response = await Axios.post(BASE_URL + 'user/login', this.state);
      this.setState({
        token: response.data.token,
        loading: false,
        error: false
      })
      await AsyncStorage.setItem('token', response.data.token)
      this.props.navigation.navigate('Home');
      // navigation.dispatch(
      //   StackActions.replace('Home'));
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
      return Alert.alert(
        'Error',
        'Error email or password incorrect',
        [{ text: 'OK' }],
        { cancelable: false }
      )
    }
  }

  render() {
    const { container, sectionForm, sectionButton, input, button, fontLogin, logoContainer, logo, sectionSignup } = styles;
    return (
      <View style={container}>
        <View style={logoContainer}>
          <Image style={logo} source={require('../assets/images/github.png')} />
          <Text style={{ fontSize: 24, }}>Resto Loop</Text>
        </View>
        <View style={sectionForm}>
          <TextInput style={input} placeholder="Email" onChangeText={(value) => this.setState({ email: value })} />
          <TextInput style={input} placeholder="Password" secureTextEntry onChangeText={(value) => this.setState({ password: value })} />
        </View>
        <View style={sectionButton}>
          <TouchableOpacity onPress={this.validateUser}>
            <View style={button}>
              <Text style={fontLogin}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
            <Text style={{ marginTop: 10 }}>Don't have an account? Signup.</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    flexDirection: 'column'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 70,
    height: 70
  },
  sectionForm: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sectionButton: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ecf0f1',
    color: 'black',
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontLogin: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})