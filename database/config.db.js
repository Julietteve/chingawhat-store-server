const mongoose = require('mongoose')
const { MONGODB_CNN } = require("../config/globals")

const dbConnection = async () =>{
    try {
        await mongoose.connect (MONGODB_CNN, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })

        console.log('Database Online')

    }
    catch (err){
        console.log(err)
        throw new Error
    }
}

module.exports = {dbConnection}