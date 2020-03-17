import React, { useState } from 'react'
import { View, Text, Alert, TouchableHighlight, Modal, StyleSheet, ScrollView, TextInput, Image, Picker } from 'react-native'
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Grid, Col, Button } from 'native-base'
import { connect } from 'react-redux'
import { postCart } from '../redux/actions/cart'
import { deleteProduct, updateProduct } from '../redux/actions/product'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import { set } from 'react-native-reanimated'

const ListItemComp = (props) => {
    const { id, name, price, description, image, stock, category_id } = props.data;
    const { dispatch, token, category } = props

    // Modal
    const [modalVisible, setModalVisible] = useState(false);

    // Form
    const [fIdCategory, setFIdCategory] = useState(category_id);
    const [fAvatarSource, setFAvatarSource] = useState(null);
    const [fName, setFName] = useState(name);
    const [fDescription, setFDescription] = useState(description);
    const [fPrice, setFPrice] = useState(price);
    const [fStock, setFStock] = useState(stock);
    const [loading, setLoading] = useState(false);

    const ModalVisible = (visible) => {
        setModalVisible(visible);
    }

    const addCart = () => {
        dispatch(postCart({ product_id: id, qty: 1 }, { headers: { 'Authorization': 'Bearer ' + token } }))
    }

    const deleteProducts = () => {
        return Alert.alert('Delete', 'Are you sure?',
            [{ text: 'Cancel', },
            { text: 'Yes', onPress: () => dispatch(deleteProduct(id)) }])
    }

    const handleChoosePhoto = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setFAvatarSource(response);
            }
            // }
        });
    }

    const handleAdd = async () => {
        if (fAvatarSource) {
            setLoading(true)

            const dataFile = new FormData()
            dataFile.append('name', fName)
            dataFile.append('description', fDescription)
            dataFile.append('price', fPrice)
            dataFile.append('stock', fStock)
            dataFile.append('image', {
                uri: fAvatarSource.uri,
                type: 'image/jpeg',
                name: fAvatarSource.fileName
            })
            dataFile.append('id_category', fIdCategory)

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            dispatch(updateProduct(id, dataFile, config))
                // await Axios.post('http://192.168.1.196:3001/api/v1/product', dataFile)
                .then(() => {
                    setLoading(false)
                    Alert.alert('edit sukses');
                    setModalVisible(!modalVisible);
                })
                .catch(() => {
                    Alert.alert('Failure to edit')
                })
        } else {
            Alert.alert('Please upload foto first')
        }
    }

    const select = category.map(categorys => {
        return <Picker.Item key={categorys.id} value={categorys.id} label={categorys.name} />
    })

    return (
        <View style={{ flex: 1 }}>
            <Content>
                <List>
                    <ListItem key={id}>
                        <Left>
                            <TouchableOpacity onPress={addCart}>
                                {image ? <Thumbnail square source={{ uri: `${image.replace('localhost', '192.168.1.196')}` }} /> : <Text>No Image</Text>}
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Text>{name}</Text>
                            <Text>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
                        </Body>
                        <Right>
                            <Grid>
                                <Col>
                                    <TouchableOpacity onPress={() => ModalVisible(true)}>
                                        <Button info small style={{ marginBottom: 5 }}><Text style={{fontSize: 12, color: 'white', alignItems:'center'}}>   Edit</Text></Button>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={deleteProducts}>
                                        <Button primary small><Text style={{fontSize: 12, color: 'white'}}> Delete</Text></Button>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </Right>
                    </ListItem>
                </List>
            </Content >

            <Modal animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() =>
                    // Alert.alert('Modal has been closed.');
                    ModalVisible(!modalVisible)
                }>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.form}>
                            <Text style={styles.title}> Edit Product </Text>
                            <TextInput style={styles.field} defaultValue={fName} onChangeText={(fName) => setFName(fName)} />
                            <TextInput style={styles.field} defaultValue={fDescription} onChangeText={(fDescription) => setFDescription(fDescription)} />
                            <TextInput keyboardType='numeric' style={styles.field} defaultValue={fPrice.toString()} onChangeText={(fPrice) => setFPrice(fPrice)} />
                            <TextInput keyboardType='numeric' style={styles.field} defaultValue={fStock.toString()} onChangeText={(fStock) => setFStock(fStock)} />
                            <Picker selectedValue={fIdCategory} onValueChange={(itemValue) =>
                                setFIdCategory(itemValue)}>
                                {select}
                            </Picker>
                            <TouchableHighlight onPress={() => handleChoosePhoto()}>
                                <View style={styles.upload}>
                                    <Text style={styles.txtupload}>Upload Image</Text>
                                </View>
                            </TouchableHighlight>
                            <Image source={fAvatarSource} style={{ resizeMode: 'contain', width: 100, height: 100, margin: 5 }} />
                            <TouchableHighlight onPress={() => handleAdd()}>
                                <View style={styles.btnAdd}>
                                    <Text style={styles.txtAdd}>Edit</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'salmon',
        color: '#3498db'
    },
    form: {
        backgroundColor: '#3498db',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 30
    },
    field: {
        backgroundColor: '#ecf0f1',
        color: 'black',
        borderRadius: 10,
        fontSize: 14,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 20
    },
    upload: {
        height: 40,
        width: 120,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 10,
    },
    txtupload: {
        fontSize: 16,
    },
    btnAdd: {
        width: 250,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        marginBottom: 24
    },
    txtAdd: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})


const mapStateToProps = ({ product, cart }) => {
    return {
        product,
        cart
    }
}

export default connect(mapStateToProps)(ListItemComp)