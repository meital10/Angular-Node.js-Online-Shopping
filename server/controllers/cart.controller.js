const express = require('express');
const router = express.Router();
const cartService = require('../service/cart.service');

router.post('/cart', async (req, res) => {

    try {
        const newCart = await cartService.addCart(req.body);
        console.log(newCart);
        res.status(200).json(newCart);
    } catch (err) {
        console.log('controller:createCart err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// update 

router.put('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await cartService.updateCart(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateCart err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// get the carts
router.get('/cart', async (req, res) => {

    try {
        const carts = await cartService.fetchCart(req.query);
        res.json(carts);
    } catch (err) {
        console.log('controller getCarts err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get the last cart of current user
router.get('/lastCart', async (req, res) => {

    try {
        const carts = await cartService.fetchLastCart(req.user);
        res.json(carts);
    } catch (err) {
        console.log('controller getLastCarts err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get cart by id

router.get('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await cartService.fetchCartId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getCartById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// delete cart
router.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await cartService.deleteCart(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteCart err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

module.exports = router;