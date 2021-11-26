import { getViewers } from './twitch.js'

/**
 * Retrieve all streamer login from a JSON containing data on streamers.
 *
 * @param {JSON} jsonStreamers JSON of information about streamers.
 * @return {Array} logins Streamers login.
 */
export const getStreamerLogin = (jsonStreamers) => {
    let logins = []

    for (const streamer of jsonStreamers) {
        logins.push(streamer.user_login)
    }

    return logins
}

/**
 * Return all viewers of a streamer from json without certain category of viewers.
 *
 * @param {JSON} jsonViewers JSON who contains all viewers.
 * @return {Array} viewers Stream viewers.
 */
export const getViewersFromSingleStreamer = (jsonViewers) => {
    const notRecover = ['broadcaster']
    let viewers = []

    for (const category in jsonViewers['chatters']) {
        if (inArray(notRecover, category)) continue;

        for (const viewer of jsonViewers['chatters'][category]) {
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
    let viewers = {}

    for (const streamerLogin of streamersLogin) {
        viewers[streamerLogin] = []

        const jsonViewers = await getViewers(streamerLogin)
        viewers[streamerLogin] = getViewersFromSingleStreamer(jsonViewers)
    }
    
    return viewers
}

/**
 * Boolean method used to find out if a string is in an array.
 *
 * @param {Array} arr Array in which we search.
 * @param {String} str str The searched string.
 * @return {Boolean} - True if the str exists in the arr otherwise false.
 */
const inArray = (arr, str) => (arr.indexOf(str) > -1)
