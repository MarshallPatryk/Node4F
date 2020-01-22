const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const multer = require("multer");
const request = require('request');

const Asortyment = require("../models/asortyment");

//const Asort = mongoose.model('dane', Asortyment, 'dane')

mongoose.connect('mongodb+srv://admin:school2@cluster0-x9n8p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//wymusza pobranie jsona i dodaje do bazy
//TODO dodac wgrywanie do bazy
//usuwanie starszych i dodac guzik aktualizacji i wybor salonu
router.post("/:Salon", (req, res, next)=> {
    const salon = req.params.Salon;
    
    Asortyment.remove({salon: salon}).exec()
    .then(result=> {
       
    })
    .catch(err => {

    });
    
    request('https://wm-test.otcf.pl/api/Products/'+salon, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        console.log("------------>pobrano dane dla "+salon);
        importedJSON=importedJSON.Products;

        const daneSalon = new Asortyment({
            _id: new mongoose.Types.ObjectId(),
            salon: salon,
            dane: importedJSON,
            data: Date.now()
        });
        daneSalon.save()
        .then(result => {
            res.status(200).json({
                message: "Wgrano dane"
            });
        })
        .catch(err => res.status(500).json({error: err}));
        
        
    }
})
});


//TODO
//pobiera json salonu z bazy najnowszy
router.get("/:Salon", (req, res, next)=> {
    const salon2 = req.params.Salon;
    Asortyment.find({salon: salon2}).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));
});


//usuwa wszystkie json danego salonu
router.delete("/:Salon", (req, res, next)=> {
    const salon2 = req.params.Salon;
    Asortyment.remove({salon: salon2}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie danych salonu " + salon2});
    })
    .catch(err => { res.status(500).json({error: wynik})});
});

module.exports = router;