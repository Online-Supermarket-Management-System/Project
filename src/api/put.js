import {PUT} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `/${endpoint}`
}

export const update = (email,data) => {
    const endpoint = getEndpointWithPrefix('update');
    return PUT(endpoint,data)
}