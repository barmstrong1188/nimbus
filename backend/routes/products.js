const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Create a new product (POST /api/products)
router.post('/', async(req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        // Create the product
        const newProduct = await Product.create({ name, description, price, quantity });
        res.status(201).json({ message: 'Product created successfully', product: newProduct });  
    } catch(error) {
        // Check if the error is a Sequlize validation error
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        console.error('Error creating product', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all products (GET /api/products)
router.get('/', async(req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch(error) {
        console.error('Error fetching products', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single product by id (GET /api/products/:id)
router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json(product);
    } catch(error) {
        console.error('Error fetching product', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a product (PUT or PATCH /api/products/:id)
router.put('/:id', async(req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const product = await Product.findByPk(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price !== undefined ? price : product.price;
        product.quantity = quantity !== undefined ? quantity: product.quantity;

        await product.save();
        res.json({ message: 'Product updated successfully', product });
    } catch(error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a product (DELETE /api/products/:id)
router.delete('/:id', async(req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch(error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;