const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required:true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

})

const Books = mongoose.model("Books", booksSchema);
module.exports = Books;

