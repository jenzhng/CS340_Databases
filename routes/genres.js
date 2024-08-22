/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

genres.js
    This file is the route for the genres page.
    It sets up the routes for the genres page.
    CRUD operations for the Genres table are defined here.

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
router.get('/genres', (req, res) => {
  let query1 = 'SELECT * FROM Genres'

  db.pool.query(query1, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('genres', { data: rows })
    }
  })
})

router.post('/add-genre', (req, res) => {
  let data = req.body;
  console.log(data)

  query = `INSERT INTO Genres (name, description) VALUES ('${data.name}', '${data.description}')`

  db.pool.query(query, function (err, result) {
    if (err) {
      console.log("ERROR:" + err)
    } else {
      db.pool.query(`SELECT * FROM Genres WHERE genreID = ${result.insertID}`,
      function (err, rows, fields) {
        if (err) {
          console.log("ERROR" + err)
          res.send("ERROR:" + err)
        } else {
          res.send(rows[0])
        }
      })
    }
  })
})

router.put('/update-genre/', (req, res) => {
  let data = req.body;
  console.log(data);

  let updateQueries = [];
  let queryParams = [];

  if (data.name) {
    updateQueries.push('name = ?')
    queryParams.push(data.name)
  }

  if (data.description) {
    updateQueries.push('description = ?')
    queryParams.push(data.description)
  }

  let query = `UPDATE Genres SET ${updateQueries.join(', ')} WHERE genreID = ?`
  queryParams.push(data.genreID)
  console.log(queryParams)

  db.pool.query(query, queryParams, function (err, result) {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

router.delete('/delete-genre/', (req, res) => {
  let data = req.body;
  console.log(data)
  let genreID = parseInt(data.genreID)
  let query = `DELETE FROM Genres WHERE genreID = ?`

  db.pool.query(query, [genreID], function (err, result, fields) {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = router