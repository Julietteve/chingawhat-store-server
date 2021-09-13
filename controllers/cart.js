const ProductDB  = require('../models/product')
const CartDB = require('../models/cart')

const product  = new ProductDB;
const cart = new CartDB

// Listar producto del carrito por ID

const getProductFromCart = async (req, res) => {

  const { id } = req.params;

  if(id != null){
    const currentCart = await cart.getById(id)
    if (currentCart) {
      return res.json(currentCart);
    }
    else{
      res.status(404).json({
        error: "Producto no encontrado",
      });
    }
  }
  else{
    const carritos = await cart.get();
    if (!carritos) {
      return res.status(404).json({
        error: "No hay ordenes cargadas en el carrito",
      });
    }
    res.json(carritos);
  }

}

// Agregar un producto al carrito 
const postProductFromCart = async (req,res)=>{

    const {id} = req.params;
    const carritos = await cart.get()
    const products = await product.get()
  
    let currentProduct = {};
    let obj = {};

    currentProduct = products.find( product => ( (product._id == id) ));

    obj = {
        id: carritos.length + 1,
        timestamp: Date.now(),
        producto: {
            id: currentProduct.id,
            timestamp: currentProduct.timestamp,
            name: currentProduct.name,
            description: currentProduct.description,
            code: currentProduct.code,
            thumbnail: currentProduct.thumbnail,
            price: currentProduct.price,
            stock: currentProduct.stock
        }
    }

    const added = await cart.add(obj.producto)

    if(added){
        res.json(obj);
    }
    else{
        res.status(400).send();
    }

}

//Borrar producto del carrito

const deleteProductFromCart = async (req,res) => {

    const { id } = req.params;

    const currentOrder = await cart.remove(id)

      if (currentOrder) {
        return res.json(currentOrder);
      }
      res.status(404).json({
        error: "Orden no encontrada",
      });
}

module.exports = {
    getProductFromCart,
    postProductFromCart,
    deleteProductFromCart,
}