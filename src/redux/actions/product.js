import Axios from 'axios'
import { BASE_URL } from 'react-native-dotenv';

export const getProduct = () => {
    return {
        type: 'GET_PRODUCT',
        payload: Axios.get(`${BASE_URL}product/`)
    }
};

export const postProduct = (data, config) => {
    return {
        type: 'POST_PRODUCT',
        payload: Axios.post(`${BASE_URL}product/`, data, config)
    }
};

export const updateProduct = (product_id, data, config) => {
    return {
        type: 'PATCH_PRODUCT',
        payload: Axios.patch(`${BASE_URL}product/` + product_id, data, config)
    }
};

export const deleteProduct = (product_id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: Axios.delete(`${BASE_URL}product/` + product_id)
    }
};