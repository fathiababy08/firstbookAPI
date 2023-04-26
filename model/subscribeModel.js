const mongoose = require('mongoose')
const Schema = mongoose.Schema
const subSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: 'true'
    }
})

module.exports = mongoose.model('sub', subSchema)
