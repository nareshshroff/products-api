const {ObjectID} = require('mongodb');
const {mongoose} = require('./../db/dbserver.js');
const {productmodel} = require('./../models/productmodel.js');

var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var port = process.env.port || 3000;

app.use(bodyparser.json());

app.post('/product', (req,res) => {
    var product = new productmodel({
        name: req.body.name,
        rating: req.body.rating,
        maker: req.body.maker
    });

    product.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send('Unabel to save');
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/product', (req,res) => {
    productmodel.find().then((doc) => {
        if (!doc){
            return res.status(400).send('Unabel to find products');
        }

        res.send(doc);
    }, (err) => {
        res.status(400).send('Error retreiving Products.');
    });
});

app.get('/product/:id', (req,res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Invalid Id.');
    }

    productmodel.findById(id).then((doc) => {
        if (!doc){
            return res.status(400).send('Unabel to find products');
        }
        res.send(doc);
    }, (err) => {
        res.status(400).send('Error retreiving Products.');
    });
});

app.delete('/product/:id', (req,res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Invalid Id.');
    }

    productmodel.findByIdAndRemove(id).then((doc) => {
        if (!doc){
            return res.status(400).send('Unabel to find products');
        }
        res.send(doc);
    }, (err) => {
        res.status(400).send('Error deleting Product.');
    });
});

app.patch('/product/:id', (req,res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Invalid Id.');
    }

    productmodel.findByIdAndUpdate(id, {$set:req.body}, {new:true}).then((doc) => {
        if (!doc){
            return res.status(400).send('Unabel to find products');
        }
        res.send(doc);
    }, (err) => {
        res.status(400).send('Error deleting Product.');
    });
});