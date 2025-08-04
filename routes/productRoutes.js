const express = require('express');
const router = express.Router();

const db = require('../config/db');
const productController = require('../controllers/productController');

router.get('/', productController.wellcome);

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get all products
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: A list of products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.getAllProducts);

/**
 * @swagger
 * /api/products/:id:
 *  get:
 *      summary: Get a product by ID
 *      tags: [Products]
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *           type: integer
 *        description: The ID of the product
 *      responses:
 *        200:
 *          description: A product details
 *          content:
 *              application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *        404:
 *          description: Product not found
 */
router.get('/products/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/search/{keyword}:
 *  get:
 *      summary: Search products by keyword
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: keyword
 *            required: true
 *            schema:
 *              type: string
 *            description: The keyword to search for
 *      responses:
 *          200:
 *              description: A list matched products
 */
router.get('/products/search/:keyword', productController.searchProducts);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductInput'
 *      responses:
 *          201:
 *              description: Product created successfully
 */
router.post('/products', productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *      summary: Update a product
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: integer
 *          description: The product ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ProductInput'
 *      responses:
 *          200:
 *              description: Product updated successfully
 *          404:
 *              description: Product not found
 */
router.put('/products/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Soft delete a product
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: integer
 *          description: The ID of product to delete
 *      responses:
 *        200:
 *          description: Product soft-delete successfully
 *        404:
 *          description: Product not found
 */
router.delete('/products/:id', productController.softDeleteProduct);

/**
 * @swagger
 * /api/products:
 *  put:
 *      summary: restore a soft-delete a product
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The ID of product to restore
 *      responses:
 *        200:
 *          description: Product restore successfully
 *        404:
 *          description: Product not found or not deleted
 */
router.put('/products/restore/:id', productController.restoreProduct);

module.exports = router;