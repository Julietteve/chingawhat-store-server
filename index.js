require('dotenv').config()
const  app  = require("./server")
const { PORT } = require("./config/globals")

//Open connection
app.listen( PORT, ()=>{
    console.log(`Escuchando en puerto ${PORT}`)
})
app.on( "error" , err => console.log(`Error en el servidor :  ${err}`))