import Axios from 'axios'

const baseURL = 'http://192.168.1.196:3001/api/v1/'

export const getCart = (config) => {
    return {
        type: 'GET_CART',
        payload: Axios.get(`${baseURL}cart/`, config)
    }
};

export const postCart = (data, config) => {
    return {
        type: 'POST_CART',
        payload: Axios.post(`${baseURL}cart/`, data, config)
    }
};

export const patchCart = (id, data, config) => {
    return {
        type: 'PATCH_CART',
        payload: Axios.patch(`${baseURL}cart/` + id, data, config)
    }
};

export const deleteCart = (config) => {
    return {
        type: 'DELETE_CART',
        payload: Axios.delete(`${baseURL}cart/cancel`, config)
    }
};

export const deleteDetailCart = (id, config) => {
    return {
        type: 'DELETE_DETAIL_CART',
        payload: Axios.delete(`${baseURL}cart/` + id, config)
    }
};

export const checkoutCart = (data, config) => {
    return {
        type: 'CHECKOUT_CART',
        payload: Axios.post(`${baseURL}cart/checkout`, data, config)
    }
};

export const getOrders = (config) => {
    return {
        type: 'GET_ORDERS',
        payload: Axios.get(`${baseURL}orders/`, config)
    }
}