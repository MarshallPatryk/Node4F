const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const multer = require("multer");
const request = require('request');

const Produkt = require("../models/product");


//localhost:3000/product/5902818800382?salon=ru2
//pobieranie produktu poprzez kod i format danych
router.get("/:kod", (req, res, next)=> {
    const kodD = req.params.kod;
    const salon = req.query.salon;
    var importedJSON;
    request('https://wm-test.otcf.pl/api/Products/'+salon, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            importedJSON = JSON.parse(body);
            importedJSON = importedJSON.Products;

            var arrayFound = importedJSON.filter(function(item) {
                return item.d == kodD;
                
            });
            res.status(200).json(arrayFound);
        }
    });
});

//localhost:3000/product/m/5902818800382?salon=ru2
router.get("/m/:model", (req, res, next)=> {
    const model = req.params.model;
    const salon = req.query.salon;
    const kolor = req.query.kolor;
    const rozmiar = req.query.rozmiar;
    //jesli kolor podany szuka tez kolor
    var importedJSON;
    var arrayFound;
    request('https://wm-test.otcf.pl/api/Products/'+salon, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            importedJSON = JSON.parse(body);
            importedJSON = importedJSON.Products;

            arrayFound = importedJSON.filter(function(item) {
                var nn = item.a;
                var arr = nn.split(" ");
                
                //20S+20S+20S blad przy tych kolorach (tylko skarpety)
                if(kolor!=null){
                    if(rozmiar!=null){
                        return arr[0] == model && arr[1] == kolor && arr[2] == rozmiar;
                    }else{
                        return arr[0] == model && arr[1] == kolor;
                    }
                }else{
                    if(rozmiar!=null){
                        return arr[0] == model && arr[2] == rozmiar;
                    }else{
                        return arr[0] == model;
                    }
                }
            });
            res.status(200).json(arrayFound);
        }
    });

});


module.exports = router;