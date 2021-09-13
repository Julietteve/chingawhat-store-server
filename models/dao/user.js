const { Schema, model} = require('mongoose')

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'Compulsory name']
    },
    email:{
        type: String,
        required: [true, 'Compulsory e-mail'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Compulsory password']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type: String,
        default:true
    },
})

// Metodo para imprimir es el JSON, se puede modificar desde aca para evitar que se envie ciertos campos en la respuestas

UserSchema.methods.toJSON = function () {
    const {__v, password, ...user } = this.toObject()
    return user
}

module.exports = model('User', UserSchema)