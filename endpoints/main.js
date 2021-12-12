import { getTopStreamer } from '../lib/twitch.js'
import { getStreamerLogin, getViewersFromStreamersLogin } from '../lib/helper.js'
import { bulkUpsertHistory } from '../lib/db.js'

export const routes = async (app, options) => {
    app.get('/', async function (request, reply) {
        reply.send({ code: reply.statusCode, message: 'success' })
    })

    app.get('/streamer/:lang/:top', async function (request, reply) {
        let data = await getTopStreamer(request.params.lang, request.params.top)

        reply.send({ code: reply.statusCode, message: 'success', data: data })
    })

    app.get('/streamer/:lang/:top/chat/users', async function (request, reply) {
        const topStreamer = await getTopStreamer(request.params.lang, request.params.top)
        const data = await getViewersFromStreamersLogin(getStreamerLogin(topStreamer))

        await bulkUpsertHistory(this.mongo.db.collection('history'), data)

        reply.send({ code: reply.statusCode, message: 'success' })
    })

    app.get('/mongo/history/reset', async function (request, reply) {
        await this.mongo.db.collection('history').drop()
        await this.mongo.db.createCollection('history')
        await this.mongo.db.collection('history').createIndex(
            { name: 1 },
            { unique: true }
        )

        reply.send({ code: reply.statusCode, message: 'success' })
    })
}
