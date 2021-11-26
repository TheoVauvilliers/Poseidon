import { getChatUsers } from './twitch.js'

/**
 * Retrieve all streamer login from a JSON containing data on streamers
 *
 * @param {JSON} jsonStreamers JSON of Information about streamers.
 * @return {Array} logins Streamers login.
 */
export const retrieveStreamerLogin = (jsonStreamers) => {
    let logins = []

    for (let streamer of jsonStreamers) {
        logins.push(streamer.user_login)
    }

    return logins
}

/**
 * Return all viewers from one streamer.
 *
 * @param {String} streamerLogin Streamer login.
 * @return {Array} viewers Stream viewers.
 */
export const getViewersFromJSON = (json) => {
    const notRecover = ['broadcaster']
    let viewers = []

    for (let category in json["chatters"]) {
        if (inArray(notRecover, category)) continue;

        for (let user of json["chatters"][category]) {
            viewers.push(user)
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

    for (let broadcaster of streamersLogin) {
        viewers[broadcaster] = []

        let jsonViewers = await getChatUsers(broadcaster)
        viewers[broadcaster] = getViewersFromJSON(jsonViewers)
    }
    
    return viewers
}

const inArray = (arr, str) => (arr.indexOf(str) > -1)
