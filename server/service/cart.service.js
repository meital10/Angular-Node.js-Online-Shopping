const mongoose = require('mongoose');
const cartSchema = require('../models/cart.model');
const cartItemSchema = require('../models/cart-item.model');
const oredersSchema = require('../models/orders.model');

const Cart = mongoose.model('Cart', cartSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Order = mongoose.model('Order', oredersSchema);


const fetchCart = async () => {
    try {
        console.log('fetchCart');

        return await Cart.find({}).populate('user')
    } catch (err) {
        console.log('service fetchCart err', err);
    }
}
const fetchLastCart = async (userID) => {
    try {
        const allOrderedCarts = await Order.find({ client: userID }).map((cartItem) => {
            return cartItem.map((cartInner) => cartInner.cart);
        });
        const lastCart = await Cart.findOne({ client: userID, _id: { $nin: allOrderedCarts } }).populate('user');
        //if the user doesnt have any cart open create a new one
        const cartResponseObject = {};

        if (lastCart === null) {
            cartResponseObject.cart = await addCart({ client: userID });
            cartResponseObject.cartItems = [];
        } else {
            cartResponseObject.cartItems = await CartItem.find({ cart: mongoose.Types.ObjectId(lastCart._id) }).
                populate({ path: 'product', select: '_id name price image categoryID' });
            cartResponseObject.cart = lastCart;
        }
        return cartResponseObject;

    } catch (err) {
        throw err;

    }
}


const fetchCartId = async (id) => {
    try {
        return await Cart.findById({ _id: mongoose.Types.ObjectId(id) }).populate('user')
    } catch (err) {
        console.log('service: fetchCartId err', err);
    }
}

const addCart = async (cart) => {
    try {
        const newCart = new Cart(cart);
        // console.log(newCart);
        return await newCart.save();
    } catch (err) {
        console.log('service: addCart err', err.message);
    }
}



const updateCart = async (id, data) => {
    try {
        const result = await Cart.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateCart err', err.message);

    }
}


const deleteCart = async (id) => {
    try {
        const result = await Cart.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteCart err', err.message);

    }
}

module.exports = {

    fetchCart, fetchCartId, addCart, updateCart, deleteCart, fetchLastCart


}

