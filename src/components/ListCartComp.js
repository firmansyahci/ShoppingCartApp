import React from 'react'
import { View, Text } from 'react-native'
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Grid, Col, Button } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { patchCart, deleteDetailCart } from '../redux/actions/cart'
import { connect } from 'react-redux'
import { URL } from 'react-native-dotenv';


const ListCartComp = (props) => {
    const { id, name, image, total_price, qty } = props.data;
    const { token, dispatch } = props;

    const addQty = () => {
        let qtyTotal = qty + 1;
        dispatch(patchCart(id, { 'qty': qtyTotal }, { headers: { 'Authorization': 'Bearer ' + token } }))
    }

    const minQty = () => {
        let qtyTotal = qty - 1;
        if (qtyTotal >= 1) {
            dispatch(patchCart(id, { 'qty': qtyTotal }, { headers: { 'Authorization': 'Bearer ' + token } }))
        } else {
            dispatch(deleteDetailCart(id, { headers: { 'Authorization': 'Bearer ' + token } }))
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Content>
                <List>
                    <ListItem>
                        <View style={{ flex: 2, marginRight: 30 }}>
                            <Left>
                                {image ? <Thumbnail square source={{ uri: `${image.replace('localhost', URL)}` }} /> : <Text>No Image</Text>}
                            </Left>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Body>
                                <Text>{name}</Text>
                                <Grid>
                                    <Col>
                                        <TouchableOpacity onPress={minQty}>
                                            <Button small bordered success><Text>      -</Text></Button>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <Button small bordered success><Text>     {qty}</Text></Button>
                                    </Col>
                                    <Col>
                                        <TouchableOpacity onPress={addQty}>
                                            <Button small bordered success><Text>     +</Text></Button>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Body>
                        </View>
                        <View style={{ flex: 2, marginLeft: 30}}>
                            <Right>
                                <Text style={{ fontSize: 14 }}>Rp.{total_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
                            </Right>
                        </View>
                    </ListItem>
                </List>
            </Content>
        </View>
    )
}

const mapStateToProps = ({ cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(ListCartComp)