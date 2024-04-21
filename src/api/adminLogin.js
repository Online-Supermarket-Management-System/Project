import {POST} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `/auth/${endpoint}`
}

export const adminLogin = (data) => {
    const endpoint =  getEndpointWithPrefix('login')
    return POST(endpoint, data)
}