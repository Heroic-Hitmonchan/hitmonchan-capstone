const Sequelize = require('sequelize')
const db = require('../db')
const passport = require('passport')
const crypto = require('crypto')

const User = db.define('user', {
  spotifyUserId: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true,
    validator: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validator: {
      isEmail: true,
      notEmpty: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  }
})

module.exports = User
