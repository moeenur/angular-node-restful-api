/**
 * Database connection
 *
 * @type Module mysql|Module mysql
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'DB_HOST',
    database: 'DB_DATABASE',
    user: 'DB_USERNAME',
    password: 'DB_PASSWORD'
});

connection.connect();

module.exports = connection;