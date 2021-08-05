const mongoose = require('mongoose');
const productsSchema = require('../models/products.model');

const Products = mongoose.model('Products', productsSchema);


const fetchProduct = async () => {
    try {
        return await Products.find({})
    } catch (err) {
        console.log('service fetchProduct err', err);
    }
}


const fetchProductId = async (id) => {
    try {
        return await Products.findById({ _id: mongoose.Types.ObjectId(id) });
    } catch (err) {
        console.log('service: fetchProductyId err', err);
    }
}

const fetchProductByCategoryID = async (id) => {
    try {
        return await Products.find({ categoryID: mongoose.Types.ObjectId(id) });
    } catch (err) {
        console.log('service: fetchProductyId err', err);
    }
}

const addProduct = async (product) => {
    try {
        const newProduct = new Products(product);
        // console.log(newCategory);
        return await newProduct.save();
    } catch (err) {
        console.log('service: addProduct err', err.message);
    }
}



const updateProduct = async (id, data) => {
    try {
        const result = await Products.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateProduct err', err.message);

    }
}


const deleteProduct = async (id) => {
    try {
        const result = await Products.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteProduct err', err.message);

    }
}

module.exports = {
    fetchProduct, fetchProductId, fetchProductByCategoryID, addProduct, updateProduct, deleteProduct
}