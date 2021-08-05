const mongoose = require('mongoose');
const oredersSchema = require('../models/orders.model');

const Order = mongoose.model('Order', oredersSchema);


const fetchOrders = async () => {
    try {
        return await Order.find({}).populate('users').populate('carts');
    } catch (err) {
        console.log('service fetchOrder err', err);
    }
}


const fetchOrderId = async (id) => {
    try {
        return await Order.findById({ _id: mongoose.Types.ObjectId(id) }).populate('user').populate('cart');
    } catch (err) {
        console.log('service: fetchOrderId err', err);
    }
}

const addOrder = async (order) => {
    try {
        const newOrder = new Order(order);
        // console.log(newOrder);
        return await newOrder.save();
    } catch (err) {
        console.log('service: addOrder err', err.message);
    }
}



const updateOrder = async (id, data) => {
    try {
        const result = await Order.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateOrder err', err.message);

    }
}


const deleteOrder = async (id) => {
    try {
        const result = await Order.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteOrder err', err.message);

    }
}



module.exports = {

    fetchOrders, fetchOrderId, addOrder, updateOrder, deleteOrder

}