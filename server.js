'use strict'

import Fastify from 'fastify'
import mongoConnector from './config/db.js'
import { routes } from './endpoints/main.js'
import dotenv from "dotenv"
dotenv.config()

const app = Fastify({ logger: true })

app.register(mongoConnector)
app.register(routes)

const start = async () => {
    try {
        await app.listen(process.env.SERVER_PORT)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
