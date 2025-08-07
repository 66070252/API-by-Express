const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const { get } = require('../routes/productRoutes');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products WHERE is_deleted = 0';
        db.query(query, callback);
    },
    
    getById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ? AND is_deleted = 0';
        db.query(query, [id], callback);
    },

    searchByKeyword: (keyword, callback) => {
        const searchTerm = `%${keyword}%`;
        const query = 'SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0';
        db.query(query, [searchTerm], callback);
    },
    create: (productData, callback) => {
        const { name, price, discount, review_count, image_url } = productData;
        const id = uuidv4();
        const query = 'INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [id, name, price, discount, review_count, image_url], callback);
    },
    update: (id, productData, callback) => {
        const { name, price, discount, review_count, image_url } = productData;
        const query = 'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?';
        db.query(query, [id, name, price, discount, review_count, image_url], callback);
    },
    softDelete: (id, callback) => {
        const query = 'UPDATE products SET is_deleted = 1 WHERE id = ?';
        db.query(query, [id], callback);
    },
    restore: (id, callback) => {
        const query = 'UPDATE products SET is_deleted = 0 WHERE id = ?';
        db.query(query, [id], callback);
    },
    getProductsView: (callback) => {
        const query = 'SELECT * FROM products WHERE is_deleted = 0';
        db.query(query, callback);
    }
};

module.exports = Product;
