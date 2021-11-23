import Fastify from 'fastify'
import dbConnector from './db.js'
import endpoints from './endpoints/main.js'

const fastify = Fastify({
    logger: true
})

fastify.register(dbConnector)
fastify.register(endpoints)

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()