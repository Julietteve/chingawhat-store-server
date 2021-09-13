require('dotenv').config()
const  app  = require("./server")
const { PORT } = require("./config/globals")
const {dbConnection } = require('./database/config.db')

const  connect = async () => {
    await dbConnection()
}

connect()

//Open connection
app.listen( PORT, ()=>{
    console.log(`Escuchando en puerto ${PORT}`)
})
app.on( "error" , err => console.log(`Error en el servidor :  ${err}`))