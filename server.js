require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes
app.use('/productos', require('./routes/product.routes'))
app.use('/carrito', require('./routes/cart.routes'))

//Open connection
app.listen( port, ()=>{
    console.log(`Escuchando en puerto ${port}`)
})
app.on( "error" , err => console.log(`Error en el servidor :  ${err}`))