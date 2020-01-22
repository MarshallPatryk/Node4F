const mongoose = require("mongoose");

const asortymentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    salon: String,
    dane: Object,
    data: Date
});

module.exports =  mongoose.model("Asortyment", asortymentSchema);