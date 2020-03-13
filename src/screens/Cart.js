import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getCart, checkoutCart, deleteCart } from '../redux/actions/cart'
import ListCartComp from '../components/ListCartComp'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { Grid, Col, Content, Left, Right, ListItem, List, Body, Button } from 'native-base'

export class Cart extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            search: '',
            loading: false,
            error: false,
            token: ''
        }
    }

    componentDidMount() {
        this.getCart();
    }

    getCart = async () => {
        const token = await AsyncStorage.getItem('token');
        // Axios.get('http://192.168.1.196:3001/api/v1/cart', {headers: { 'Authorization': 'Bearer '}})
        // .then(response => 
        await this.props.dispatch(getCart({ headers: { 'Authorization': `Bearer ${token}` } }))
        this.setState({
            result: this.props.cart.cartData,
            token: token
        })
    }

    cancel = async () => {
        const token = await AsyncStorage.getItem('token');
        await this.props.dispatch(deleteCart({ headers: { 'Authorization': `Bearer ${token}` } }))
    }

    checkout = async () => {
        const token = await AsyncStorage.getItem('token');
        await this.props.dispatch(checkoutCart({}, ({ headers: { 'Authorization': `Bearer ${token}` } })))

        Alert.alert('Checkout Sukses', '', [{ text: 'Ok', onPress: () => this.props.navigation.navigate('Home')}]);
    }

    render() {
        const { container, button, fontColor } = styles;
        const { result } = this.state;
        const totalCart = this.state.result.reduce((prev, cur) => {
            return prev + cur.total_price
        }, 0);
        return (
            <View style={container}>
                <View style={{ flex: 7 }}>
                    <FlatList data={result} renderItem={({ item }) => <ListCartComp data={item} token={this.state.token} />} />
                </View>
                <View style={{flex:1}}>
                    <List>
                        <ListItem>
                            <Left>
                                <Text>Total</Text>
                            </Left>
                            <Right>
                                <Text>Rp.{totalCart}</Text>
                            </Right>
                        </ListItem>
                    </List>
                </View>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity onPress={this.checkout}>
                        <Button style={button} block>
                            <Text style={fontColor}>Checkout</Text>
                        </Button>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cancel}>
                        <Button style={button} block danger>
                            <Text style={fontColor}>Cancel</Text>
                        </Button>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        margin: 5,
    },
    fontColor: {
        color: 'white'
    }
})

const mapStateToProps = ({ product, cart }) => {
    return {
        product,
        cart
    }
}

export default connect(mapStateToProps)(Cart)