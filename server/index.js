const express = require('express')
const path = require('path')
const {db} = require('./db')
const PORT = 8000
const app = express()

app.use(express.json())

app.use('/auth', require('./auth'))

app.get('', (req, res) => {
  res.send('hello')
})

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
      console.log('db is successfully synced')
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
