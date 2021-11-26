import { getChatUsers } from './twitch.js'

export const retrieveStreamerLogin = (json) => {
    let logins = []

    for (let streamer of json) {
        logins.push(streamer.user_login)
    }

    return logins
}

// Get all viewers for a stream from json response
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
