import dotenv from 'dotenv'
import fetch from 'cross-fetch'
dotenv.config()

const baseApi = '//api.twitch.tv/helix/'
const baseApiTmi = '//tmi.twitch.tv/group/'
const errorMessage = 'An error has occurred'

export const getUserByLogin = async (login) => {
    const response = await fetch(baseApi + `users?login=${login}`, {
        headers: {
            'Authorization': 'Bearer ' + process.env.TWITCH_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    })

    if (response.status >= 400) {
        return errorMessage
    }

    const data = await response.json()

    return data.data
}

export const getChannelInfo = async (id) => {
    const response = await fetch(baseApi + `channels?broadcaster_id=${id}`, {
        headers: {
            'Authorization': 'Bearer ' + process.env.TWITCH_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    })

    if (response.status >= 400) {
        return errorMessage
    }

    const data = await response.json()

    return data.data
}

export const getTopStreamer = async (lang, top) => {
    const response = await fetch(baseApi + `streams?language=${lang}&first=${top}`, {
        headers: {
            'Authorization': 'Bearer ' + process.env.TWITCH_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    })

    if (response.status >= 400) {
        return errorMessage
    }

    const data = await response.json()

    return data.data
}

export const getChatUsers = async (login) => {
    const response = await fetch(baseApiTmi + `user/${login}/chatters`, {
        headers: {
            'Authorization': 'Bearer ' + process.env.TWITCH_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    })

    if (response.status >= 400) {
        return errorMessage
    }

    const data = await response.json()

    return data
}