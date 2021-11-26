import { getChatUsers } from './twitch.js'

/**
 * Retrieve all streamer login from a JSON containing data on streamers
 *
 * @param {JSON} jsonStreamers JSON of Information about streamers.
 * @return {Array} logins Streamers login.
 */
export const retrieveStreamerLogin = (jsonStreamers) => {
    let logins = []

    for (const streamer of jsonStreamers) {
        logins.push(streamer.user_login)
    }

    return logins
}

/**
 * Return all viewers from json without certain category of viewers.
 *
 * @param {JSON} streamerLogin Streamer login.
 * @return {Array} viewers Stream viewers.
 */
export const getViewersFromJSON = (json) => {
    const notRecover = ['broadcaster']
    let viewers = []

    for (const category in json["chatters"]) {
        if (inArray(notRecover, category)) continue;

        for (const viewer of json["chatters"][category]) {
            viewers.push(viewer)
        }
    }

    return viewers
}

/**
 * From a streamer login array, get all viewers in each chat.
 *
 * @param {Array} streamersLogin Streamers login.
 * @return {Object} viewers Viewers for each streamer.
 */
export const getViewersFromTopStreamer = async (streamersLogin) => {
    const notRecover = ['broadcaster']
    let viewers = {}

    for (const streamerLogin of streamersLogin) {
        viewers[streamerLogin] = []

        const jsonViewers = await getChatUsers(streamerLogin)
        viewers[streamerLogin] = getViewersFromJSON(jsonViewers)
    }
    
    return viewers
}

const inArray = (arr, str) => (arr.indexOf(str) > -1)
