const router = require('express').Router()
const request = require('request')
require('dotenv').config()
// const axios = require('axios')
// const SpotifyStrategy = require('passport-spotify').Strategy
// let passport = require('passport');
// const {User} = require('../db')

let token;

const redirect_uri = 'http://localhost:8000/auth/callback'

router.get('/', (req, res) => {
  console.log('auth homepage reached')
  res.send('auth homepage')
})

router.get('/login', (req, res) => {
  const state = 'randomstate'
  const scope = 'user-read-email'
  console.log('client ID:', process.env.CLIENT_ID)

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    redirect_uri,
    scope,
    state
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
})

router.get('/callback', async (req, res) => {
  console.log('callback reached')
  let code = req.query.code || null
  let state = req.query.state || null

  if (state === null) {
    res.redirect('/?error=state_mismatch')
  } else {
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': "Basic " + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    }
    request.post(authOptions, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        let access_token = body.access_token
        token = access_token
        res.redirect('/')
      }
    })
  }
})

// https://api.spotify.com/v1/search?genre%3Apopgenre%3Apiano&type=track&market=ES&limit=5

router.get('/find-song', (req, res, next) => {

  let genreList = ['piano', 'pop'].map(genre => {
    return encodeURIComponent('genre:' + genre)
  }).join('+')
  console.log(genreList)

  const params = new URLSearchParams({
    type: 'track',
    market: 'ES',
    locale: 'en-US,en;q=0.9',
    offset: 0,
    limit: 5
  })
  let queryOptions = {
    url: `https://api.spotify.com/v1/search?q=${genreList}&${params.toString()}`,
    headers: {
      'Authorization': "Bearer " + token,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  console.log('queryOptions url:', queryOptions.url)
  request.get(queryOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.send(body)
    } else {
      console.log("No response")
      res.send(err)
    }
  })
})

module.exports = router
