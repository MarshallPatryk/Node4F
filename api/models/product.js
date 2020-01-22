const mongoose = require("mongoose");


// a model, b cena obecna, c cena pierwsza, d kod, e ilosc
const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    a: String,
    b: Number,
    c: Number,
    d: String,
    e: Number
});

module.exports = mongoose.model("Product", productSchema);