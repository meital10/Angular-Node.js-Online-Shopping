const mongoose = require('mongoose');
const categorySchema = require('../models/category.model');

const Category = mongoose.model('Category', categorySchema);


const fetchCategory = async () => {
    try {
        return await Category.find({}).populate('products').exec();
    } catch (err) {
        console.log('service fetchCategory err', err);
    }
}


const fetchCategoryId = async (id) => {
    try {
        return await Category.findById({ _id: mongoose.Types.ObjectId(id) }).populate('products').exec();
    } catch (err) {
        console.log('service: fetchCategoryId err', err);
    }
}

const addCategory = async (category) => {
    try {
        const newCategory = new Category(category);
        // console.log(newCategory);
        return await newCategory.save();
    } catch (err) {
        console.log('service: addCategory err', err.message);
    }
}


const updateCategory = async (id, data) => {
    try {
        const result = await Category.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: data
        });

        return result;
    } catch (err) {
        console.log('service: updateCategory err', err.message);

    }
}


const deleteCategory = async (id) => {
    try {
        const result = await Category.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return result;
    } catch (err) {
        console.log('service:deleteCategory err', err.message);

    }
}




module.exports = {

    fetchCategory, fetchCategoryId, addCategory, updateCategory, deleteCategory


}