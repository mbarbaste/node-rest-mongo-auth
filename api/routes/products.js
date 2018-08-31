const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', ( req, res, next) => {
    Product.find()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'Failed',
                error: err.message
            });
        });
});

router.post('/', (req , res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });

    product.save()
        .then( result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        msg: 'Manejando POST request a /productos',
        createdProduct: product
    });
});

router.get('/:productId', ( req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .exec()
        .then(doc => {
            console.log('From Database',doc);
            if(doc) {                
                res.status(200).json(doc);
            } else {
                console.log(doc);
                res.status(404).json({
                    msg: 'No encontrado'
                });
            }            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'Failed',
                msg: 'Recurso no encontrado y/o inexistente',
                error: err.message,
                value: err.value
            });
        });

});

router.patch('/:productId', ( req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        msg: `Manejando PATCH request a /productos/${id} con req.params` 
    });
});

module.exports = router;