import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

export default class Register extends Component {
  constructor(props) {
    super()
    let loggedIn = false;
    this.state = {
      email: '',
      password: '',
      retypepassword: '',
      emailErr: '',
      passwordErr: '',
      successMsg: '',
      redirectLogin: false
    }

    // this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  validate = async () => {
    let emailErr = '';
    let passwordErr = '';

    if (this.state.email )

    if (this.state.password !== this.state.retypepassword) {
      this.setState({ passwordErr: 'password not match' });
      return false
    }

    return true;
  }

  handlerSubmit = async () => {
    // e.preventDefault();
    const isValid = this.validate();
    try {
      if (isValid) {
      await Axios.post(BASE_URL + 'user/signup', {'email': this.state.email, 'password': this.state.password})
        .then(respone => {
          this.setState({ successMsg: 'User succesfuly created', redirectLogin: true, passwordErr: '' })
        })
        Alert.alert('Sukses', 'Please Login', [{ text: 'Ok', onPress: () => this.props.navigation.navigate('Login') }]);    
      } else {
        Alert.alert('Error', 'password not match', [{ text: 'Ok' }]);
      }
    }
    catch {
      Alert.alert('Error', 'connection error', [{ text: 'Ok' }]);
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
        <ScrollView>
          <View style={sectionForm}>
            <TextInput style={input} placeholder="Email" onChangeText={(value) => this.setState({ email: value })} />
            <TextInput style={input} placeholder="Password" secureTextEntry onChangeText={(value) => this.setState({ password: value })} />
            <TextInput style={input} placeholder="Retype Password" secureTextEntry onChangeText={(value) => this.setState({ retypepassword: value })} />
          </View>
          <View style={sectionButton}>
            <TouchableOpacity onPress= { this.handlerSubmit }>
              <View style={button}>
                <Text style={fontLogin}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100
  },
  sectionForm: {
    flex: 2,
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