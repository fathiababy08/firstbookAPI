const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const comSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 4.0,
        min: 1, 
        max: 5,
    },
    place:{
        type: String,
        required: true

    },
    comment: {
        type: String,
        required: true
    },
  
})

module.exports = mongoose.model('Comment', comSchema)