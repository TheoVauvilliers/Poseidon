import { getTopStreamer } from '../lib/twitch.js'
import { getStreamerLogin, getViewersFromLoginArray } from '../lib/helper.js'
import { upsertHistory } from '../lib/db.js'

export const routes = async (app, options) => {
    app.get('/', async function (request, reply) {
        reply.send({ data: 'main' })
    })

    app.get('/streamer/:lang/:top', async function (request, reply) {
        let data = await getTopStreamer(request.params.lang, request.params.top)

        reply.send({ data })
    })

    app.get('/streamer/:lang/:top/chat/users', async function (request, reply) {
        const jsonTopStreamer = await getTopStreamer(request.params.lang, request.params.top)
        const data = await getViewersFromLoginArray(getStreamerLogin(jsonTopStreamer))

        await upsertHistory(this.mongo.db, data)

        reply.send({ data: 'done' })
    })

    app.get('/mongo/history/reset', async function (request, reply) {
        await this.mongo.db.collection('history').drop()
        await this.mongo.db.createCollection('history')
        await this.mongo.db.collection('history').createIndex(
            { name: 1 },
            { unique: true, }
        )

        reply.send({ data: 'reset' })
    })
}
