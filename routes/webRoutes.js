const express = require('express');
const router = express.Router();

const db = require('../config/db');
const productController = require('../controllers/productController');

router.get('/', productController.getProductsView);

module.exports = router;