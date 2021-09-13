const mongoose = require('mongoose');

const schemaProduct = new mongoose.Schema({
  id: { type: Number, require: true },
  timestamp: { type: String, require: true, max:100},
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 100 },
  code: { type: String, require: true, max: 100 },
  thumbnail: { type: String, require: true, max: 100 },
  price: { type: Number, require: true, max: 100 },
  stock: { type: Number, require: true, max: 100 }
})

const daoProduct = mongoose.model('Product', schemaProduct);

module.exports ={ daoProduct };