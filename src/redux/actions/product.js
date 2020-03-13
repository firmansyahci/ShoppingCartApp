import Axios from 'axios'

const baseURL = 'http://192.168.1.196:3001/api/v1/'

export const getProduct = () => {
    return {
        type: 'GET_PRODUCT',
        payload: Axios.get(`${baseURL}product/`)
    }
};

export const postProduct = (data, config) => {
    return {
        type: 'POST_PRODUCT',
        payload: Axios.post(`${baseURL}product/`, data, config)
    }
};

export const updateProduct = (product_id, data, config) => {
    return {
        type: 'PATCH_PRODUCT',
        payload: Axios.patch(`${baseURL}product/` + product_id, data, config)
    }
};

export const deleteProduct = (product_id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: Axios.delete(`${baseURL}product/` + product_id)
    }
};