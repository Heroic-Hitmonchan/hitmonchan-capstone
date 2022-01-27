const User = require('./models/user')
const db = require('./db')


// x.hasMany(y)
// y.hasMany(x)

module.exports = {
  db,
  User
}
