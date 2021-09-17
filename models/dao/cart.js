const mongoose = require('mongoose');

const schemaCart = new mongoose.Schema({
  cartId: { type: Number, require: true },
  cartTimestamp: { type: String, require: true, max:100},
  id: { type: Number, require: true },
  timestamp: { type: String, require: true, max:100},
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true},
  code: { type: String, require: true, max: 100},
  thumbnail: { type: String, require: true},
  price: { type: Number, require: true},
  stock: { type: Number, require: true}
})

const daoCart = mongoose.model('Cart', schemaCart);

module.exports ={ daoCart };
