import {GET} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `/${endpoint}`
}

export const getCustomer = (email) => {
    const endpoint =  getEndpointWithPrefix('getCustomer/'+email)
    return GET(endpoint)
}