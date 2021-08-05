const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },

    userId: {
        type: String,
        required: true
    },


    password:
    {
        type: String,
        required: true

    },
    city:
    {
        type: String,
        required: true,
    },
    street:
    {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'client',
        enum: ["client", "admin"]
    },



}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



module.exports = userSchema;