/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

records.js
    This file is the route for the records page.
    It sets up the routes for the records page.
    CRUD operations for the Records table are defined here.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')
const { raw } = require('mysql')


// Middleware
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


// ROUTES
router.get('/records', (req, res) => {
  let query1 = 'SELECT * FROM Records'

  db.pool.query(query1, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('records', { data: rows })
    }
  })
})

router.post('/add-record', (req, res) => {
  let data = req.body

  query = `INSERT INTO Records (title, artist, qtyStock, price)
          VALUES ('${data.title}', '${data.artist}', '${Number(data.qtyStock)}','${Number(data.price)}')`

  db.pool.query(query, function (err, result) {
    if (err) {
      console.log("ERROR:" + err)
    } else {
      db.pool.query(`SELECT * FROM Records WHERE recordID = ${result.insertID}`,
      function (err, rows, fields){
        if (err) {
          console.log("ERROR:" + err)
        } else {
          res.send(rows[0])
        }
      })
    }
  })
})

router.put('/update-record/', (req, res) => {
  let data = req.body;
  let updateQueries = [];
  let queryParams = [];

  if (data.title) {
    updateQueries.push('title = ?')
    queryParams.push(data.title)
  }

  if (data.artist) {
    updateQueries.push('artist = ?')
    queryParams.push(data.artist)
  }

  if (data.qtyStock) {
    updateQueries.push('qtyStock = ?')
    queryParams.push(Number(data.qtyStock))
  }

  if (data.price) {
    updateQueries.push('price = ?')
    queryParams.push(Number(data.price))
  }

  let query = `UPDATE Records SET ${updateQueries.join(', ')} WHERE recordID = ?`
  queryParams.push(data.recordID)
  console.log(queryParams)

  db.pool.query(query, queryParams, function (err, result) {
    if (err) {
      console.log("ERROR:" + err)
    } else {
      res.send(result)
    }
  })
})

router.delete('/delete-record/', (req, res) => {
  let data = req.body;
  console.log(data);
  let recordID = Number(data.recordID)
  let query = `DELETE FROM Records WHERE recordID = ?`

  db.pool.query(query, [recordID], function (err, rows, fields) {
    if (err) {
      console.log("ERROR:" + err)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = router