const express = require('express')
const path = require('path')
const axios = require('axios')

const card = require('./card')

const app = express()

app.use('/file', express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.send('Chess Card')
})
app.get('/card', function (req, res) {
  res.send("Need username!")
})
app.get('/card/:username', function (req, res) {
  const { username } = req.params;

  // const data = []

  axios.get(`https://api.chess.com/pub/player/${username}`)
    .then(function (response) {

      res.header('Content-Type', 'image/svg+xml');
      res.send(card.render(response.data))
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  // res.header('Content-Type', 'image/svg+xml');
  // res.send(card.render(data))
})


app.listen(3333)