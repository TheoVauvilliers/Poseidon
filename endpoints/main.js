import { getChannelInfo, getTopStreamer, getUserByLogin } from '../lib/twitch/twitch.js'
import { getStreamerLogin, getViewersFromLoginArray } from '../lib/twitch/helper.js'
import { insertData } from '../lib/twitch/db.js'

export const routes = async (app, options) => {
    app.get('/', async function (request, reply) {
        reply.send({ data: 'main' })
    })

    app.get('/user/:login', async function (request, reply) {
        let data = await getUserByLogin(request.params.login)

        reply.send({ data })
    })

    app.get('/channel/:id', async function (request, reply) {
        let data = await getChannelInfo(request.params.id)

        reply.send({ data })
    })

    app.get('/streamer/:lang/:top', async function (request, reply) {
        let data = await getTopStreamer(request.params.lang, request.params.top)

        reply.send({ data })
    })

    app.get('/streamer/:lang/:top/chat/users', async function (request, reply) {
        const jsonTopStreamer = await getTopStreamer(request.params.lang, request.params.top)
        const data = await getViewersFromLoginArray(getStreamerLogin(jsonTopStreamer))

        await insertData(this.mongo.db, data)

        reply.send({ data })
    })

    app.get('/mongo/test', async function (request, reply) {
        await insertData(this.mongo.db)

        reply.send({ data : 'coucou' })
    })
}
