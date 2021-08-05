const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    categoryID: { type: Schema.Types.ObjectId, ref: 'Category' }


}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = productsSchema;