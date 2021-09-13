const mongoose = require('mongoose');
const { MONGODB_CNN } = require("../config/globals");
const { daoProduct } = require('./dao/product');
  
  class ProductDB {
  
    constructor() {
      mongoose.connect(MONGODB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }, (err) => {
        if (err) {
          console.log(err);
        }else{
          console.log('Conected to productDb');
        }
      })
    }
  
    async add (data) {
    
      const product = {
        id: (await this.get()).length + 1,
        timestamp: Date.now(),
        name: data.name,
        description: data.description,
        code: data.code,
        thumbnail: data.thumbnail,
        price: data.price,
        stock: data.stock
      }
      console.log(product);

      try{
        const newProduct =  await daoProduct.create(product)
        return newProduct
      }
      catch(err){
        console.log(err)
      }

    }
  
    async get () {
      try{
        let prods = await daoProduct.find()
        return prods
      }
      catch(err){
        console.log(err)
      }
    }
  
    async getById(id) {
      try{
        let prods = await daoProduct.findById(id)
        console.log(prods)
        return prods
      }
      catch(err){
        console.log(err)
      }
     
    }

    async update(id, data) {
      try{
        const  updated = await daoProduct.findByIdAndUpdate(id, data, {
          new: true,
        })
        return updated
      }
      catch(err){
        console.log(err)
      }

    }
  
    async remove(id) {
      try{
        const  deleted  = await daoProduct.findByIdAndDelete(id)
        return deleted
      }
      catch(err){
        console.log(err)
      }
      
    }

    // Filters

    async getByCode(prodCode){
      let code = await daoProduct.find({code: prodCode})
      return code
    }

    async getByCategory(categoryId){
      let category = await daoProduct.find({category: categoryId})
      return category
    } 

    async getByPriceRange(min,max){
        let price = await daoProduct.find({price: { $gt: Number(min) - 1, $lt: Number(max) + 1 }})
        return price
    }

    async getByStockRange(min,max){
      let stock = await daoProduct.find({ stock: { $gt: Number(min) - 1, $lt: Number(max) + 1 } })
      return stock
    }

    async getByName(prodName){
        let name = await daoProduct.find({name: prodName})
        return name
    }
  
    close() {
      mongoose.disconnect(err => { console.log('Disconected from db') });
    }
  
  }
  
  module.exports = ProductDB;