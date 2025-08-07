const { search } = require("../routes/productRoutes");
const db = require('../config/db')
const Product = require('../models/productModel');

const productController = {
    wellcome: (req, res) => {
        res.send('hi');
    },
    getAllProducts: (req, res) => {
          Product.getAll((err, results) => {
              if(err) return res.status(500).json({ error: err.message });
              res.json(results);
          });
        },
    getProductById: (req, res) => {
          Product.getById(req.params.id, (err, results) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json(results[0] || {})
          });
        },
    searchProducts: (req, res) => {
        const { keyword } = req.params; 
          Product.searchByKeyword(keyword, (err, results) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json(results)
          });
        },
    createProduct: (req, res) => {
        const {name, price } = req.body;
        if (!name || price == null) {
            return res.status(400).json({ error: 'name and price are required'});
        }
          Product.create(req.body, (err, results) => {
            if(err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Product created'
            });
          });
        },
    updateProduct: (req, res) => {
        const {id} = req.params;
        Product.update(id, req.body, err => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product updated' });
          });
        },
    softDeleteProduct:  (req, res) => {
        const { id } = req.params;
        Product.softDelete(id, err => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product soft-deleted' });
          });
        },
    restoreProduct: (req, res) => {
        const { id } = req.params;
        Product.restore(id, err => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product restored'});
          });
        },

        getProductsView: (req, res) => {
          Product.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('products', { products: results });
          });
        }
};

module.exports = productController;
