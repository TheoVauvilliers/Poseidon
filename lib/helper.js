import { getViewers } from './twitch.js'

/**
 * Get all streamer login from a JSON containing data on streamers
 *
 * @param {JSON} jsonStreamers JSON of information about streamers
 * @returns {Array} Streamers login
 */
export const getStreamerLogin = (jsonStreamers) => {
    return jsonStreamers.map(streamer => streamer.user_login)
}

/**
 * Extract all viewers of a streamer from json without certain category of viewers
 *
 * @param {JSON} jsonViewers JSON who contains all viewers
 * @returns {Array} Viewers
 */
export const extractViewers = (jsonViewers) => {
    const ignoredCategories = ['broadcaster']
    const categories = jsonViewers['chatters']

    return Object.keys(categories)
        .filter(category => !ignoredCategories.includes(category))
        .reduce((acc, currentValue) => [...acc, ...categories[currentValue]], []);
}

/**
 * From a streamer login array, get all viewers in each chat
 *
 * @param {Array} streamersLogin Streamers login
 * @returns {Array} Array of objects who contains streamer login and viewers
 */
export const getViewersFromLoginArray = async (streamersLogin) => {
    const resolvedPromise = await Promise.all(streamersLogin.map(streamer => getViewers(streamer)))

    return resolvedPromise.map((data, index) => ({
        name: streamersLogin[index],
        viewers: extractViewers(data)
    }))
}