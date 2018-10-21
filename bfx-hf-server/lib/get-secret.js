'use strict'

const debug = require('debug')('bfx:hf:secret')
const fs = require("fs")
const util = require("util")

module.exports = (secret) => {
    const fromEnv = process.env[secret]
    if (fromEnv) return fromEnv

    const file = util.format('/run/secrets/%s', secret)
    try {
        const fromFile = fs.readFileSync(file, 'utf8').trim()
        return fromFile
    } catch (error) {
        debug(`secret file (${file}) error: %s`, error)
        process.exit(1)
    }
}
