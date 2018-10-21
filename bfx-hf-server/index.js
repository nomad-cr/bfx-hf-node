'use strict'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:algo-server:node:server')
const SocksProxyAgent = require('socks-proxy-agent')
const connectDB = require('./connect-db')
const {
    PingPong, IcebergOrder, TWAPOrder, AccumulateDistribute
} = require('bfx-hf-algo')

const AOServer = require('bfx-hf-algo-server/lib/server')
const { SERVER_PORT, MONGODB_URL, API_KEY, API_SECRET, WS_URL, REST_URL, SOCKS_PROXY_URL } = process.env

const run = async () => {
    await connectDB(MONGODB_URL || 'mongodb://localhost/hf-as')

    const server = new AOServer({
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        wsURL: WS_URL || 'wss://api.bitfinex.com/ws/2',
        restURL: REST_URL || 'https://api.bitfinex.com',
        agent: SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null,
        port: SERVER_PORT || 8877,

        aos: [
            PingPong,
            IcebergOrder,
            TWAPOrder,
            AccumulateDistribute
        ],
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
