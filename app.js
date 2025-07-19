require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('❌', err.message);
        process.exit(1);
    }
    console.log('✅');
});

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสินค้า' });
        }
        res.json(results);
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'ไม่พบสินค้า' });
        }
        
        res.json(results[0]);
    });
});

app.get('/products/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';
    
    db.query(sql, [`%${keyword}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'ไม่พบสินค้า' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});