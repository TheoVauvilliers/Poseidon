import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from 'fastify-mongodb'

async function dbConnector (app, options) {
    app.register(fastifyMongo, {
    url: 'mongodb://127.0.0.1:27017/poseidon'
  })
}

export default fastifyPlugin(dbConnector)
