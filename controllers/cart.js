
const { Cart } = require("../models/cart");
const cart = new Cart;


// Listar producto del carrito por ID

const getProductFromCart = async (req, res) => {

    const productsOnCart = await cart.showCartById(req.params.id);
    
    res.json(productsOnCart);
}

// Agregar un producto al carrito 
const postProductFromCart = async (req,res)=>{

    const addedProduct = await cart.addToCart(req.params.id);

    res.json(addedProduct);

}

//Borrar producto del carrito

const deleteProductFromCart = async (req,res) => {

    const productDeleted = await cart.deleteProduct(req.params.id);

    res.json(productDeleted);
}

module.exports = {
    getProductFromCart,
    postProductFromCart,
    deleteProductFromCart,
}