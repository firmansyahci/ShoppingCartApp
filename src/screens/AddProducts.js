import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Picker, Alert, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {  ScrollView } from 'react-native-gesture-handler'
import Axios from 'axios'
import { connect } from 'react-redux'
import { postProduct } from '../redux/actions/product'

export class AddProducts extends Component {
    constructor() {
        super();
        this.state = {
            id_category: 1,
            avatarSource: null,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            loading: false,
            category: []
        }
    }

    componentDidMount = async () => {
        const cat = await Axios.get('http://192.168.1.196:3001/api/v1/category/');
        this.setState({
            category: cat.data.result
        })
    }

    handleChoosePhoto = () => {
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

                this.setState({
                    avatarSource: response,
                });
            }
            // }
        });
    }

    handleAdd = async () => {
        if (this.state.avatarSource) {
            this.setState({
                loading: true
            })
            const dataFile = new FormData()
            dataFile.append('name', this.state.name)
            dataFile.append('description', this.state.description)
            dataFile.append('price', this.state.price)
            dataFile.append('stock', this.state.stock)
            dataFile.append('image', {
                uri: this.state.avatarSource.uri,
                type: 'image/jpeg',
                name: this.state.avatarSource.fileName
            })
            dataFile.append('category_id', this.state.id_category)

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            this.props.dispatch(postProduct(dataFile, config))
                // await Axios.post('http://192.168.1.196:3001/api/v1/product', dataFile)
                .then(() => {
                    this.setState({
                        loading: false
                    })
                    Alert.alert('Sukses', '', [{ text: 'Ok', onPress: () => this.props.handlerModal() }]);
                })
                .catch(() => {
                    Alert.alert('Failure to add')
                })
        } else {
            Alert.alert('Please upload foto first')
        }
    }

    render() {
        const select = this.state.category.map(categorys => {
            return <Picker.Item key={categorys.id} value={categorys.id} label={categorys.name} />
        })

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.form}>
                        <Text style={styles.title}> Add Product </Text>
                        <TextInput style={styles.field} placeholder="Nama Item" onChangeText={(name) => this.setState({ name })} />
                        <TextInput style={styles.field} placeholder="description" onChangeText={(description) => this.setState({ description })} />
                        <TextInput keyboardType='numeric' style={styles.field} placeholder="Price" onChangeText={(price) => this.setState({ price })} />
                        <TextInput keyboardType='numeric' style={styles.field} placeholder="Stock" onChangeText={(stock) => this.setState({ stock })} />
                        <Picker
                            selectedValue={this.state.id_category}
                            style={{ height: 50, width: 200 }}
                            onValueChange={(itemValue) =>
                                this.setState({ id_category: itemValue })
                            }>
                            {select}
                        </Picker>
                        
                            <View style={styles.upload}>
                            <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                <Text style={styles.txtupload}>Upload Image</Text>
                                </TouchableOpacity>
                            </View>
                        
                        <Image source={this.state.avatarSource} style={{ resizeMode: 'contain', width: 100, height: 100, margin: 5 }} />
                        <TouchableHighlight onPress={() => this.handleAdd()}>
                            <View style={styles.btnAdd}>
                                <Text style={styles.txtAdd}>Add</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'salmon',
        color: 'white'
    },
    form: {
        backgroundColor: '#3498db',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20
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
        marginBottom: 30,
        marginTop: 24
    },
    txtAdd: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

const mapStateToProps = ({ product }) => {
    return {
        product
    }
}

export default connect(mapStateToProps)(AddProducts)