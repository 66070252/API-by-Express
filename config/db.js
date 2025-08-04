const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,

});

db.getConnection((err, connection) => {
    if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
    }
    console.log('Connected to MySQL');
    connection.release();
});

module.exports = db;
