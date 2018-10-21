'use strict'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:algo-server:node:server')
const SocksProxyAgent = require('socks-proxy-agent')
const AOServer = require('bfx-hf-algo-server/lib/server')
const connectDB = require('./lib/connect-db')
const getSecret = require('./lib/get-secret')

const { PLATFORM, SERVER_PORT, MONGODB_URL, SOCKS_PROXY_URL } = process.env
const { WS_URL, REST_URL } = require('./lib/platform')(PLATFORM)
const API_KEY = getSecret('API_KEY')
const API_SECRET = getSecret('API_SECRET')

const run = async () => {
    await connectDB(MONGODB_URL || 'mongodb://localhost/hf-as')

    const server = new AOServer({
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        wsURL: WS_URL,
        restURL: REST_URL,
        agent: SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null,
        port: SERVER_PORT || 8877,

        aos: require('./lib/algos'),
    })

    server.on('auth:success', () => {
        debug('authenticated')
    })

    server.on('auth:error', (error) => {
        debug('auth error: %j', error)
    })
}

try {
    run()
} catch (err) {
    debug('error: %s', err)
}
