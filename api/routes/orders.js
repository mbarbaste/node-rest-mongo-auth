const express = require('express');

const router = express.Router();

router.get('/', ( req, res, next) => {
    res.status(200).json({
        msg: 'Manejando GET request a /orders'
    });
});

router.post('/', ( req, res, next) => {
    res.status(201).json({
        msg: 'Manejando POST request a /orders'
    });
});

router.get('/:productId', ( req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        msg: `Manejando GET request a /orders/${id} con req.params` 
    });
});

router.patch('/:orderId', ( req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        msg: `Manejando PATCH request a /orders/${id} con req.params` 
    });
});

module.exports = router;