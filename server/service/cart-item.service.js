const mongoose = require('mongoose');
const cartItemSchema = require('../models/cart-item.model');
const productsSchema = require('../models/products.model');

const CartItem = mongoose.model('CartItem', cartItemSchema);
const Products = mongoose.model('Products', productsSchema);


const fetchCartItem = async () => {
    try {
        return await CartItem.find({}).populate('product').populate('cart')
    } catch (err) {
        console.log('service fetchCartItem err', err);
    }
}


const fetchCartItemId = async (id) => {
    try {
        return await CartItem.findById({ _id: mongoose.Types.ObjectId(id) }).populate('product').populate('cart')
    } catch (err) {
        console.log('service: fetchCartItemId err', err);
    }
}

const addCartItem = async (cartItem) => {
    try {
        const seletedCartItem = await CartItem.findOne({ cart: mongoose.Types.ObjectId(cartItem.cart), product: cartItem.product }).populate('product').select('price');
        if (seletedCartItem) {
            seletedCartItem.quantity = cartItem.quantity;
            seletedCartItem.generalPrice = cartItem.quantity * seletedCartItem.product.price;
            return await updateCartItem(seletedCartItem._id, seletedCartItem);
        }

        const product = await Products.findById({ _id: mongoose.Types.ObjectId(cartItem.product) });
        cartItem.generalPrice = product.price * cartItem.quantity
        const newCartItem = new CartItem(cartItem);
        // console.log(newCartItem);
        return await newCartItem.save();
    } catch (err) {
        console.log('service: addCartItem err', err.message);
        throw err;

    }
}


const updateCartItem = async (id, data) => {
    try {
        const result = await CartItem.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateCartItem err', err.message);

    }
}


const deleteCartItem = async (id) => {
    try {
        const result = await CartItem.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteCartItem err', err.message);

    }
}
const deleteAllCartItems = async (cartID) => {
    try {
        const result = await CartItem.deleteMany({ cart: mongoose.Types.ObjectId(cartID) });
        return result;
    } catch (err) {
        console.log('service:deleteAllCartItems err', err.message);

    }
}

module.exports = {

    fetchCartItem, fetchCartItemId, addCartItem, updateCartItem, deleteCartItem, deleteAllCartItems

}


