const express = require('express');
const router = express.Router();
const cartItemService = require('../service/cart-item.service');
const { isClient } = require('../validations/users.validiation');

router.post('/cart-item', async (req, res) => {

    try {
        const newCartItem = await cartItemService.addCartItem(req.body);
        console.log(newCartItem);
        res.status(200).json(newCartItem);
    } catch (err) {
        console.log('controller:createCartItem err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// update cart-item 

router.put('/cart-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await cartItemService.updateCartItem(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateCartItem err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});
// delete cartItem-client
router.delete('/cart-item/:id', isClient, async (req, res) => {
    try {
        const { id } = req.params
        const result = await cartItemService.deleteCartItem(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteCartItem err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// deleteAllCartItems- client
router.delete('/cart-items/:cartID', isClient, async (req, res) => {
    try {
        const { cartID } = req.params;
        const result = await cartItemService.deleteAllCartItems(cartID);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteAllCartItems err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// get the carts items
router.get('/cart-item', async (req, res) => {

    try {
        const cartItems = await cartItemService.fetchCartItem(req.query);
        res.json(cartItems);
    } catch (err) {
        console.log('controller getCartsItems err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})


// get cart-item by id

router.get('/cart-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const result = await cartItemService.fetchCartItemId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getCartItemById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});




module.exports = router;