const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
require('dotenv').config()
let passport = require('passport');
const {User} = require('../db')

// passport.use(
//   new SpotifyStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: 'http://localhost:8000/auth/callback'
//     },
//     function(accessToken, refreshToken, expires_in, profile, done) {
//       User.findOrCreate({ spotifyUserId: profile.id }, function(err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

router.get('/', (req, res) => {
  res.send('inside of auth file')
})


module.exports = router
