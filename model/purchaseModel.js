const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const purcSchema = new Schema ({
//         title: { type: String, required: true },
//         description: { type: String, required: true },
//         price: { type: Number, required: true },
//         user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//        category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
//        createdAt: { type: Date, default: Date.now },
//        updatedAt: { type: Date, default: Date.now }

// })

const purcSchema = new Schema(
  {

    purchased: {
      type: Boolean,
      default: false,
    },
    book:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purc", purcSchema);
