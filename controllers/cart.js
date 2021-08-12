
const { Cart } = require("../models/cart");
const { Products } = require("../models/products");

const cart = new Cart;
const stock = new Products;

// Listar producto del carrito por ID

const getProductFromCart = (req, res) => {
    const productsOnCart = cart.showCartById(req.params.id);
    res.json(productsOnCart);
}

// Agregar un producto al carrito 
const postProductFromCart = (req,res)=>{
    const productFound = stock.showProductById(req.params.id_producto);

    if (productFound.length === 1) {
        cart.addToCart(productFound);
        res.json(productFound);
    } else {
        res.json(productFound)
    }
}

//Borrar producto del carrito

const deleteProductFromCart = async (req,res) => {
    const productDeleted = cart.deleteProduct(req.params.id);
    res.json(productDeleted);
}

module.exports = {
    getProductFromCart,
    postProductFromCart,
    deleteProductFromCart,
}