import {POST} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `/${endpoint}`
}

export const register = (data) => {
    const endpoint =  getEndpointWithPrefix('create')
    return POST(endpoint, data)
}

export const login = (data) => {
    const endpoint =  getEndpointWithPrefix('login')
    return POST(endpoint, data)
}

export const adminLogin = (data) => {
    const endpoint =  getEndpointWithPrefix('admin-sign-in')
    return POST(endpoint, data)
}