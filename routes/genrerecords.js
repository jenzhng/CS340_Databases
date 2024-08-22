/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

genrerecords.js
    This file is the route for the genrerecords page.
    It sets up the routes for the genrerecords page.
    CRUD operations for the GenreRecords table are defined here.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')


// Middleware
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


// ROUTES
router.get('/genrerecords', (req, res) => {
  let query = `SELECT Records.recordID, Records.title, Records.artist,
  Records.qtyStock as Stock, Records.qtyStock * Records.price as InventoryValue,
  Genres.name AS genre, Genres.description
  FROM Records
  JOIN GenreRecords ON Records.recordID = GenreRecords.recordID
  JOIN Genres ON GenreRecords.genreID = Genres.genreID`

  db.pool.query(query, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('genrerecords', { data: rows })
    }
  })
})

router.post('/add-genre-record', (req, res) => {
  let data = req.body;
  query = `INSERT INTO GenreRecords (recordID, genreID) VALUES ((SELECT recordID
  FROM Records WHERE title = '${data['input-record']}'), (SELECT genreID FROM Genres
  WHERE name = '${data['input-genre']}'))`

  db.pool.query(query, function (err, result) {
    if (err) {
      console.log('Error:' + err)
      res.send(err)
    } else {
      res.redirect('/genrerecords')
    }
  })
})

router.delete('/delete-genre-record/', (req, res) => {
  let data = req.body;
  console.log(data)
  let recordID = parseInt(data.recordID)
  let query = `DELETE FROM GenreRecords WHERE recordID = ${recordID} AND genreID
  = (SELECT genreID FROM Genres WHERE name = '${data.genre}')`

  db.pool.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router