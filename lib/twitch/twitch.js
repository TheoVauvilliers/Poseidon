import { baseUri, baseUriTmi, getHeaders } from '../api.js'
import dotenv from 'dotenv'
import fetch from 'cross-fetch'
dotenv.config()

const errorMessage = 'An error has occurred'

export const getUserByLogin = async (login) => {
    const response = await fetch(baseUri + `users?login=${login}`, await getHeaders())

    if (response.status >= 400) {
        return { code: response.status, message: errorMessage }
    }

    const data = await response.json()

    return data.data
}

export const getChannelInfo = async (id) => {
    const response = await fetch(baseUri + `channels?broadcaster_id=${id}`, await getHeaders())

    if (response.status >= 400) {
        return { code: response.status, message: errorMessage }
    }

    const data = await response.json()

    return data.data
}

export const getTopStreamer = async (lang, top) => {
    const response = await fetch(baseUri + `streams?language=${lang}&first=${top}`, await getHeaders())

    if (response.status >= 400) {
        return { code: response.status, message: errorMessage }
    }

    const data = await response.json()

    return data.data
}

export const getChatUsers = async (login) => {
    const response = await fetch(baseUriTmi + `user/${login}/chatters`, await getHeaders())

    if (response.status >= 400) {
        return { code: response.status, message: errorMessage }
    }

    const data = await response.json()

    return data
}
