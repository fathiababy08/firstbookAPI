const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const bookesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
        },
    description:{
        type: String,
        required: true
        },
    price:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }

})
const BOOKES = mongoose.model('bookes', bookesSchema)
module.exports = BOOKES
