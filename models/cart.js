const mongoose = require('mongoose');
const { MONGODB_CNN } = require("../config/globals")
const {daoCart} = require('./dao/cart');

class CartDB {

  constructor() {
    mongoose.connect(MONGODB_CNN,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err) => {
      if (err) {
        console.log(err);
      }else{
        console.log('Conected to CartDb');
      }
    })
  }

  async add (data) {

    const cart = {
      cartId: (await this.get()).length + 1,
      cartTimestamp: Date.now(),
      id: data.id,
      timestamp: data.timestamp,
      name: data.name,
      description: data.description,
      code: data.code,
      thumbnail: data.thumbnail,
      price: data.price,
      stock: data.stock
    }

    try{
      const newCart =  await daoCart.create(cart)
      return newCart
    }
    catch(err){
      console.log(err)
    }
  }

  async get () {
    try{
      const newCart =  await daoCart.find()
      return newCart
    }
    catch(err){
      console.log(err)
    }
  }

  async getById(id) {
    try{
      let cart = await daoCart.findById(id)
      return cart
    }
    catch(err){
      console.log(err)
    }
  }

  async update(id, data) {
    const cartUpdated = await daoCart.findByIdAndUpdate(id, data, {
      new: true,
    })
    return cartUpdated

  }

  async remove(id) {
    try{
      const  deleted = await daoCart.findByIdAndDelete(id)
      return deleted
    }
    catch(err){
      console.log(err)
    }
  }

  close() {
    mongoose.disconnect(err => { console.log('Disconected from db') });
  }
  
}

module.exports = CartDB;