import Fastify from 'fastify'
import mongoConnector from './db.js'
import { routes } from './endpoints/main.js'

const app = Fastify({
    logger: true
})

app.register(mongoConnector)
app.register(routes)

const start = async () => {
    try {
        await app.listen(3000)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()