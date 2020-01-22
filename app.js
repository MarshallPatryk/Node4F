const express = require("express");
const app = express();
//const morgan = require("morgan");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const asortymentRoutes = require("./api/routes/asortyment");
const productRoutes = require("./api/routes/products");

mongoose.connect('mongodb+srv://admin:school2@cluster0-x9n8p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
/*
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
*/
app.use("/salon", asortymentRoutes);
app.use("/product", productRoutes);


app.use((req, res, next)=> {
    const error = new Error("Nie znaleziono");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=> {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
