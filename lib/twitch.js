import dotenv from 'dotenv'
import fetch from 'cross-fetch'
dotenv.config()

const baseUri = '//api.twitch.tv/helix/'
const baseUriTmi = '//tmi.twitch.tv/group/'
const errorMessage = 'An error has occurred'

let token = {}

/**
 * Custom fetch call
 */

/**
 * @param {String} lang Langue of the top streamer (fr | en | es | ...)
 * @param {Number} top Number of streamer to get, MAX 100
 * @return {JSON || Object} Return data about top {top} streamer {lang} || Error status and message
 */
export const getTopStreamer = async (lang, top) => await fetchApi(`streams?language=${lang}&first=${top}`)

/**
 * @param {String} login Login of streamer
 * @returns {JSON || Object} Return all connected viewer about {login} || Error status and message
 */
export const getViewers = async (login) => await fetchTmi(`user/${login}/chatters`)

/**
 * Function used to call Twitch API
 */

/**
 *
 * @param {Object} response Response of API call
 * @return {JSON || Object} Json response || Error status and message
 */
const getContent = async (response) => {
    if (response.status >= 400) {
        return { error: true, code: response.status, message: errorMessage }
    }

    return await response.json()
}

const fetchApi = async (endpoint) => {
    const response = await fetch(baseUri + endpoint, await getHeaders())
    const data = await getContent(response)

    if (data.error) {
        return data
    }

    return data.data
}

const fetchTmi = async (endpoint) => {
    const response = await fetch(baseUriTmi + endpoint, await getHeaders())
    return getContent(response)
}

/**
 * Authentification to Twitch API
 */

const getAuthToken = async () => {
    const response = await fetch(`//id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
    })

    if (response.status >= 400) {
        return { code: response.status, message: 'An error occurred - bad request to get access token' }
    }

    const data = await response.json()

    // { access_token: 'XXX', expires_in: int, token_type: 'bearer' }
    return data
}

const getHeaders = async () => {
    if (!token.hasOwnProperty('value') || (new Date().getTime() > token['expire'])) {
        const response = await getAuthToken()
        setToken(response)
    }

    return {
        headers: {
            'Authorization': 'Bearer ' + token['value'],
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    }
}

const setToken = (response) => {
    // Subtract 100 ms to plan a call at the limit of the token's expiration
    token['expire'] = new Date().getTime() + response.expires_in - 100
    token['value'] = response.access_token
}
