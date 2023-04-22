const mongoose = require('mongoose')
const Schema = mongoose.Schema
const custSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required:'true',
    },
})
module.exports = mongoose.model('customer', custSchema)