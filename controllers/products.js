const { Product } = require("../models/product");
const { Products } = require("../models/products");
const getLenArr = require("../utils");


const  stock = new Products;

const admin = true;

// Listar producto por ID

const getProducts  = (req, res) => {
    const products = stock.showProducts();
    
    res.json(products)
}

const getProduct = (req, res) => {
    const products = stock.showProductById(req.params.id);
    res.json(products)
}

// Agregar un producto (ADMIN)

const postProduct = async (req,res)=>{

    if (admin) {
        const newProduct = new Product(title = req.body.title, price= req.body.price, thumbnail= req.body.thumbnail, id = await getLenArr('db/products.txt'));
        const productAdded = stock.addProduct(newProduct);
        res.json(productAdded);
    } 
    else {
        res.json({error: -1, descripción: `ruta /products método "POST" no autorizada`});
    }

}

//Actualizar un producto (ADMIN)

const putProduct = async (req,res) => {
    if (admin) {
        const productUpload = stock.updateProduct({id: req.params.id, product: req.body})
        res.json(productUpload);

    } else {
        res.json({error: -1, descripción: `ruta /products método "PUT" no autorizada`});
    }
}


//Borrar producto (ADMIN)

const deleteProduct = async (req,res) => {
    if (admin) {
        const productDeleted = stock.deleteProduct(req.params.id);
        res.json(productDeleted);

    } else {
        res.json({error: -1, descripción: `ruta /products método "DELETE" no autorizada`});
    }
}

module.exports = {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
    getProducts
}