/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

customers.js
    This file is the route for the customers page.
    It sets up the routes for the customers page.
    CRUD operations for the Customers table are defined here.

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
router.get('/customers', (req, res) => {
  let query1 = 'SELECT * FROM Customers'

  db.pool.query(query1, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('customers', { data: rows })
    }
  })
})

router.post('/add-customer', (req, res) => {
  let data = req.body

  query = `INSERT INTO Customers (firstName, lastName, email, phoneNumber) 
    VALUES ('${data.firstName}', '${data.lastName}', '${data.email}',
    '${data.phoneNumber}')`
  db.pool.query(query, function (err, result) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error' + err)
    } else {
      db.pool.query(
        `SELECT * FROM Customers 
            WHERE customerID = ${result.insertId}`,
        function (err, rows, fields) {
          if (err) {
            console.log('Error: ' + err)
            res.send('Error' + err)
          } else {
            res.send(rows[0])
          }
        }
      )
    }
  })
})

router.put('/update-customer/', (req, res) => {
  let data = req.body
  console.log(data)
  let updateQueries = []
  let queryParams = []

  if (data.firstName) {
    updateQueries.push('firstName = ?')
    queryParams.push(data.firstName)
  }
  if (data.lastName) {
    updateQueries.push('lastName = ?')
    queryParams.push(data.lastName)
  }
  if (data.email) {
    updateQueries.push('email = ?')
    queryParams.push(data.email)
  }
  if (data.phoneNumber) {
    updateQueries.push('phoneNumber = ?')
    queryParams.push(data.phoneNumber)
  }

  let query = `UPDATE Customers SET ${updateQueries.join(', ')} 
    WHERE customerID = ?`
  queryParams.push(data.customerID)
  console.log(queryParams)


  db.pool.query(query, queryParams, function (err, result) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error' + err)
    } else {
      res.send(result)
    }
  })
})


router.delete('/delete-customer/', (req, res) => {
  let data = req.body
  console.log(data)
  let customerID = parseInt(data.customerID)
  let query = `DELETE FROM Customers WHERE customerID = ?`

  db.pool.query(query, [customerID], function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = router
