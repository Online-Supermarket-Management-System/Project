import {POST} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `/auth/${endpoint}`
}

export const adminLogin = (data) => {
    const endpoint =  getEndpointWithPrefix('login')
    return POST(endpoint, data)
}

export const getUserRole = (data) => {
    const endpoint =  getEndpointWithPrefix('get-user-role')
    return POST(endpoint, data)
}