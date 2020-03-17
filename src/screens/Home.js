import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, ActivityIndicator, Modal, BackHandler, ToastAndroid } from 'react-native'
import Axios from 'axios';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ListItemComp from '../components/ListItemComp';
import _ from 'lodash';
import { connect } from 'react-redux'
import { getProduct } from '../redux/actions/product'
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Title, Body, Left, Item, Input, Right } from 'native-base'
import AddProduct from './AddProducts'
import { BASE_URL } from 'react-native-dotenv';

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            search: '',
            loading: false,
            error: false,
            handSearch: false,
            token: '',
            category: [],
            modalVisible: false
        }
        this.Search = _.debounce(this.Search, 1000);
    }

    componentDidMount() {
        this.getProduct();
        this.getToken();
        this.getCategory();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    getProduct = async () => {
        await this.props.dispatch(getProduct())
        this.setState({
            result: this.props.product.productData,
        })
    }

    handleBackButton() {
        BackHandler.exitApp();
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    getCategory = async () => {
        const cat = await Axios.get(BASE_URL + 'category/');
        this.setState({
            category: cat.data.result
        })
    }

    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                this.setState({ token: value })
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    onSearch = (key) => {
        this.setState({
            loading: true,
            search: key
        });
        this.Search(key);
    }

    Search = async (key) => {
        try {
            if (this.state.search.length > 2) {
                const response = await Axios.get(`${BASE_URL}product/search/${key}`);
                this.setState({
                    result: response.data.result,
                    loading: false,
                    error: false
                })
            } else {
                this.setState({
                    loading: false,
                })
                this.getProduct();
            }
        } catch (err) {
            this.setState({
                loading: false,
                error: true
            })
            return Alert.alert(
                'Error',
                'Error connection to server',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        }
    }

    handlerModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        const { container, sectionSearch, sectionList } = styles;
        const { result, loading, error } = this.state;
        return (
            <View style={container}>
                <Header>
                    <Left></Left>
                    <Body>
                        <Title>Food Items</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                            <Text style={{ fontSize: 26 }}>+  </Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Item regular>
                    <Input placeholder='Search' onChangeText={(e) => { this.onSearch(e) }} />
                </Item>
                {/* <View style={sectionSearch}>
                    <TextInput placeholder="Search" onChangeText={(e) => { this.onSearch(e) }} />
                </View> */}
                <View style={sectionList}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : error ? (
                        <Text>Error, Please try again</Text>
                    ) : result.length < 1 ? (
                        <Text>No Series found with keyboard</Text>
                    ) : (
                                    <FlatList data={result} renderItem={({ item }) => <ListItemComp data={item} token={this.state.token} category={this.state.category} />} />
                                )
                    }
                </View>
                <Modal animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() =>
                        // Alert.alert('Modal has been closed.');
                        this.setState({ modalVisible: false })
                    }>
                    <AddProduct handlerModal={this.handlerModal} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionSearch: {
        flex: 1,
        flexDirection: 'column'
    },
    sectionList: {
        flex: 5
    }
})

const mapStateToProps = ({ product }) => {
    return {
        product,
    }
}

export default connect(mapStateToProps)(Home)