/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

orders.js
    This file is the route for the orders page.
    It sets up the routes for the orders page.
    CRUD operations for the Orders table are defined here.

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
router.get('/orders', (req, res) => {
  let query1 = `SELECT Orders.orderID, Customers.email, Orders.orderDate
  FROM Orders
  INNER JOIN Customers ON Orders.customerID = Customers.customerID`

  db.pool.query(query1, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('orders', { data: rows })
    }
  })
})

router.post('/add-order', (req, res) => {
  let data = req.body;
  console.log(data);
  
  query = `INSERT INTO Orders (customerID, orderDate)
  VALUES ((SELECT customerID FROM Customers WHERE email = '${data.CustomerEmail}'), '${data.date}')`

  db.pool.query(query, function (err, result) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      db.pool.query(
        `SELECT * FROM Orders WHERE orderID = ${result.insertId}`,
        function (err, rows, fields) {
          if (err) {
            console.log('Error: ' + err)
          } else {
            res.send(rows[0])
          }
        }
      )
    }
  })
})

router.put('/update-order/', (req, res) => {
  let data = req.body;
  console.log(data);

  let updateQueries = [];
  let queryParams = [];

  if (data.email) {
    updateQueries.push('customerID = (SELECT customerID FROM Customers WHERE email = ?)')
    queryParams.push(data.email)
  }

  if (data.date) {
    updateQueries.push('orderDate = ?')
    queryParams.push(data.date)
  }

  let query = `UPDATE Orders SET ${updateQueries.join(', ')} WHERE orderID = ?`
  queryParams.push(data.orderID)
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

router.delete('/delete-order/', (req, res) => {
  let data = req.body;
  console.log(data)
  let orderID = parseInt(data.orderID)
  let query = `DELETE FROM Orders WHERE orderID = ?`

  db.pool.query(query, [orderID], function (err, result, fields) {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = router
