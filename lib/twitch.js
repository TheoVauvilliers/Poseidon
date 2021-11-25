import { baseUri, getHeaders } from './api.js'
import dotenv from 'dotenv'
import fetch from 'cross-fetch'
dotenv.config()

const errorMessage = 'An error has occurred'

export const getChannelInfo = async (id) => {
    const response = await fetch(baseUri + `channels?broadcaster_id=${id}`, await getHeaders())

    if (response.status >= 400) {
        return errorMessage
    }

    const data = await response.json()

    return data.data
}

export const getTopStreamer = async (lang, top) => {
    const response = await fetch(baseUri + `streams?language=${lang}&first=${top}`, await getHeaders())

    if (response.status >= 400) {
        return errorMessage
    }

    const data = await response.json()

    return data.data
}
