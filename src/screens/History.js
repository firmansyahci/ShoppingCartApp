import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { getOrders } from '../redux/actions/cart'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Header, Title, Body, Left, Content, List, ListItem, Right } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

export class History extends Component {

    state = {
        detailHistory: [],
        history: false,
    }

    componentDidMount() {
        this.getDetailHistory();
    }

    getDetailHistory = async () => {
        const token = await AsyncStorage.getItem('token');

        await this.props.dispatch(getOrders({ headers: { 'Authorization': `Bearer ${token}` } }))
        this.setState({
            detailHistory: this.props.cart.historyData
        })
    }

    render() {
        const { container, cardBox, cardBox1, sectionDetail, fontWhite } = styles
        const totalPrice = this.state.detailHistory.reduce((prev, cur) => {
            return prev + cur.price
        }, 0);
        const countOrders = this.state.detailHistory.reduce((prev, cur) => {
            return prev + 1
        }, 0);
        const detailHistory = this.state.detailHistory.map(detailHistorys => {
            return <ListItem key={detailHistorys.id}>
                <Left>
                    <Text>{detailHistorys.id}</Text>
                </Left>
                <Body>
                    <Text>{detailHistorys.created_at.substr(0,10)}</Text>
                </Body>
                <Right style={{ flex: 1 }}>
                    <Text>Rp. {detailHistorys.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
                </Right>
            </ListItem>
        })
        return (
            <View style={container} >
                <Header>
                    <Left></Left>
                    <Body>
                        <Title>History</Title>
                    </Body>
                </Header>
                <View style={cardBox}>
                    <Text style={fontWhite}>Total Price</Text>
                    <Text style={fontWhite}>Rp. {totalPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} </Text>
                </View>
                <View style={cardBox1}>
                    <Text style={fontWhite}>Total Orders</Text>
                    <Text style={fontWhite}> {countOrders.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} </Text>
                </View>
                <View style={sectionDetail}>
                    <ScrollView>
                        <List>
                            {detailHistory}
                        </List>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardBox: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 100,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
    },
    cardBox1: {
        flex: 1,
        backgroundColor: 'salmon',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 100,
        margin: 30
    },
    sectionDetail: {
        flex: 4
    },
    fontWhite: {
        fontSize: 18,
        color: 'white'
    }
})

const mapStateToProps = ({ product, cart }) => {
    return {
        product,
        cart
    }
}

export default connect(mapStateToProps)(History)