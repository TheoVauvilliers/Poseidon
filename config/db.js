import dotenv from "dotenv"
dotenv.config()

import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from 'fastify-mongodb'

async function dbConnector (app, options) {
    app.register(fastifyMongo, {
        url: process.env.MONGODB_URL
    })
}

export default fastifyPlugin(dbConnector)
