const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./api/middleware/cors');

mongoose.connect('mongodb+srv://mbar-mongo:' + 
                    process.env.MONGO_ATLAS_PW + 
                    '@cluster0-9dp9t.mongodb.net/test?retryWrites=true', {
                        useNewUrlParser: true 
                    });

                    mongoose.Promise = global.Promise;                    

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(cors);


// Importo las rutas
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Uso las rutas para los request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Rutas erróneas
app.use((req, res, next) => {
    const error = new Error('Recurso no Encontrado');
    error.status = 404;
    next(error);
});

// Manejo de Errores
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    });
});



// TEST 
// app.use(( req, res, next ) => {
//     res.status(200).json({
//         pgm: 'Primer middleware',
//         msg: 'Funciona'
//     });
// });

module.exports = app;