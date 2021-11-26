import { getViewers } from './twitch.js'

/**
 * Get all streamer login from a JSON containing data on streamers.
 *
 * @param {JSON} jsonStreamers JSON of information about streamers.
 * @return {Array} Streamers login.
 */
export const getStreamerLogin = (jsonStreamers) => {
    let logins = []

    for (const streamer of jsonStreamers) {
        logins = [...logins, streamer.user_login]
    }

    return logins
}

/**
 * Sort all viewers of a streamer from json without certain category of viewers.
 *
 * @param {JSON} jsonViewers JSON who contains all viewers.
 * @return {Array} Stream viewers.
 */
export const sortViewers = (jsonViewers) => {
    const notRecover = ['broadcaster']
    let viewers = []

    for (const category in jsonViewers['chatters']) {
        if (inArray(notRecover, category)) continue;

        viewers = [...viewers, ...jsonViewers['chatters'][category]]
    }

    return viewers
}

/**
 * From a streamer login array, get all viewers in each chat.
 *
 * @param {Array} streamersLogin Streamers login.
 * @return {Object} Viewers for each streamer.
 */
export const getViewersFromTopStreamer = async (streamersLogin) => {
    const viewers = await streamersLogin.reduce(async (previousPromise, streamerLogin) => {
        const accumulator = await previousPromise
        const newViewers = sortViewers(await getViewers(streamerLogin))

        return {
            ...accumulator,
            [streamerLogin]: newViewers
        }
    }, Promise.resolve([]))

    return viewers
}

/**
 * Boolean function used to find out if a string is in an array.
 *
 * @param {Array} arr Array in which we search.
 * @param {String} str str The searched string.
 * @return {Boolean} True if the str exists in the arr otherwise false.
 */
const inArray = (arr, str) => (arr.indexOf(str) > -1)
