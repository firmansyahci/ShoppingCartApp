import Axios from 'axios'
import { BASE_URL } from 'react-native-dotenv';

export const getCart = (config) => {
    return {
        type: 'GET_CART',
        payload: Axios.get(`${BASE_URL}cart/`, config)
    }
};

export const postCart = (data, config) => {
    return {
        type: 'POST_CART',
        payload: Axios.post(`${BASE_URL}cart/`, data, config)
    }
};

export const patchCart = (id, data, config) => {
    return {
        type: 'PATCH_CART',
        payload: Axios.patch(`${BASE_URL}cart/` + id, data, config)
    }
};

export const deleteCart = (config) => {
    return {
        type: 'DELETE_CART',
        payload: Axios.delete(`${BASE_URL}cart/cancel`, config)
    }
};

export const deleteDetailCart = (id, config) => {
    return {
        type: 'DELETE_DETAIL_CART',
        payload: Axios.delete(`${BASE_URL}cart/` + id, config)
    }
};

export const checkoutCart = (data, config) => {
    return {
        type: 'CHECKOUT_CART',
        payload: Axios.post(`${BASE_URL}cart/checkout`, data, config)
    }
};

export const getOrders = (config) => {
    return {
        type: 'GET_ORDERS',
        payload: Axios.get(`${BASE_URL}orders/`, config)
    }
}