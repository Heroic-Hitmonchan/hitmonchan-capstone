const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
    spotifySongId: Sequelize.STRING,
    track: Sequelize.STRING,
    artist: Sequelize.STRING,
    album: Sequelize.STRING
})

module.exports = Song