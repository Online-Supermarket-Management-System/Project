import {GET, PUT, DELETE} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `/${endpoint}`
}

export const getCustomer = (email) => {
    const endpoint =  getEndpointWithPrefix('getCustomer/'+email)
    return GET(endpoint)
}

export const update = (data) => {
    const endpoint = getEndpointWithPrefix('update');
    return PUT(endpoint, data)
}

export const deleteAcc = (id) => {
    const endpoint = getEndpointWithPrefix('delete/'+id);
    return DELETE(endpoint)
}