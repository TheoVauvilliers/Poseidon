require('dotenv').config();
import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from 'fastify-mongodb';

async function dbConnector (app, options) {
    app.register(fastifyMongo, {
    url: process.env.DEV_MONGODB_URL
  })
}

export default fastifyPlugin(dbConnector);
