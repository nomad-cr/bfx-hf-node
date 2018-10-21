'use strict'

const debug = require('debug')('bfx:hf:platfomr')

module.exports = (platform) => {
    debug('determining platform from %s', platform)
    switch (platform) {
        case 'ETHFINEX':
            debug('platform ETHFINEX')
            return {
                WS_URL: 'wss://api.ethfinex.com/ws/2',
                REST_URL: 'https://api.ethfinex.com'
            }
        case 'BITFINEX':
        case null:
        case undefined:
            debug('platform BITFINEX')
            return {
                WS_URL: 'wss://api.bitfinex.com/ws/2',
                REST_URL: 'https://api.bitfinex.com'
            }
        default:
            debug('invalid or unspecified PLATFORM, should be ETHFINEX, BITFINEX or unspecified for default BITFINEX')
            process.exit(1)
    }
}
