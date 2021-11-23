export async function routes(fastify, options) {

    fastify
        .get('/', async (request, reply) => {
        return { data: 'main' }
    })
        .get('/sub', async (request, reply) => {
        return { data: 'sub' }
    })

}