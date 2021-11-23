import dotenv from 'dotenv'
import fetch from 'cross-fetch'
dotenv.config()

const baseApi = '//api.twitch.tv/helix/'
const errorMessage = 'An error has occurred'

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