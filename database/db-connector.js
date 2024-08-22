/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

db-connector.js
    This file is the database connector for the application.
    It sets up the connection to the database.

NOTE: This is the sanitized version of db-connector where the username,
password, and database are removed.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE'
});

module.exports.pool = pool;
