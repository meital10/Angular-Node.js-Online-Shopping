const express = require('express');
const router = express.Router();
const ordersService = require('../service/orders.service');
const { isClient } = require('../validations/users.validiation');
const markdownpdf = require('markdown-pdf');


//CreateOrder
router.post('/order', isClient, async (req, res) => {

    try {
        const newOrder = await ordersService.addOrder(req.body);
        res.status(200).json(newOrder);
    } catch (err) {
        console.log('controller:createOrder err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});


// get the orders
router.get('/orders', async (req, res) => {

    try {
        const orders = await ordersService.fetchOrders(req.query);
        res.json(orders);
    } catch (err) {
        console.log('controller getOrders err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get order by id

router.get('/order/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await ordersService.fetchOrderId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getOrderById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});






// update 

router.put('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await ordersService.updateOrder(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateOrder err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});
// delete order
router.delete('/order/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await ordersService.deleteOrder(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteOrder err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});




module.exports = router;