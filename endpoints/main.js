import { getChannelInfo } from '../lib/twitch.js'

export const routes = async (app, options) => {

    app.get('/', async (request, reply) => {
        return { data: 'main' }
    })

    app.get('/user/:id', async (request, reply) => {
        let id = request.params.id
        return { id }
    })

    app.get('/channel/:id', async (request, reply) => {
        let data = await getChannelInfo(request.params.id)
        return { data }
    })
}