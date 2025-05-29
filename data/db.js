// import mysql2
const mysql = require('mysql2');

// create connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// execute connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

// export connection
module.exports = connection;