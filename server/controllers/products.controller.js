const express = require('express');
const router = express.Router();
const productsService = require('../service/products.service');
const path = require('path');
const { isAdmin, isClient } = require('../validations/users.validiation');

// get all products
router.get('/products', async (req, res) => {

    try {
        const products = await productsService.fetchProduct();
        res.json(products);
    } catch (err) {
        console.log('controller getProducts err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get product by id

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await productsService.fetchProductId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getProductById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

//get products by category id
router.get('/products/category/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await productsService.fetchProductByCategoryID(id);
        res.json(result);
    } catch (err) {
        console.log('controller: fetchProductByCategoryID err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});


// delete product
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await productsService.deleteProduct(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteProduct err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

//CreateProduct-admin
router.post('/products', isAdmin, async (req, res) => {

    try {
        console.log(req.body);
        const newProduct = await productsService.addProduct(req.body);
        res.status(200).json(newProduct);
    } catch (err) {
        console.log('controller:createProduct err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// edit products-admin
router.put('/products/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await productsService.updateProduct(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateProduct err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});







module.exports = router;