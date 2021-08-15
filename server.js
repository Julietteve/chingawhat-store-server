
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(compression())
app.use(cors())

//Routes
app.use('/productos', require('./routes/product.routes'))
app.use('/carrito', require('./routes/cart.routes'))

module.exports = app