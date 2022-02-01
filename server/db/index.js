const User = require('./models/user')
const db = require('./db');
const Image = require('./models/image');
const Song = require('./models/song')


// associations
User.hasMany(Image);
Image.belongsTo(User);

Image.hasMany(Song);
Song.belongsTo(Image);


module.exports = {
  db,
  User,
  Image,
  Song
}
