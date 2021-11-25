import { getChannelInfo, getTopStreamer, getUserByLogin, getChatUsers } from '../lib/twitch.js'

export const routes = async (app, options) => {
    app.get('/', async (request, reply) => {
        return { data: 'main' }
    })

    app.get('/user/:login', async (request, reply) => {
        let data = await getUserByLogin(request.params.login)
        return { data }
    })

    app.get('/channel/:id', async (request, reply) => {
        let data = await getChannelInfo(request.params.id)
        return { data }
    })

    app.get('/streamer/:lang/:top', async (request, reply) => {
        let data = await getTopStreamer(request.params.lang, request.params.top)
        return { data }
    })

    app.get('/streamer/:login/chat/users', async (request, reply) => {
        let data = await getChatUsers(request.params.login)

        return { data }
    })
}
