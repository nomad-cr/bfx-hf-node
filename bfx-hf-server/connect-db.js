'use strict'

const debug = require('debug')('bfx:hf:db:mongoose')
const Mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = (dbUrl) => {
    Mongoose.connect(`${dbUrl}`)

    const db = Mongoose.connection

    return new Promise((resolve, reject) => {
        db.on('error', (err) => {
            debug('connection error: %s', err)
            reject(err)
        })

        db.once('open', function () {
            debug('connected to mongoDB instance')
            resolve()
        })
    })
}
