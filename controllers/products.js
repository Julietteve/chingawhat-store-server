const { Product } = require("../models/product");
const { Products } = require("../models/products");
const { getLenArr, productHasMissingKeys } = require("../utils");


const  stock = new Products;

const admin = true;

// Listar producto por ID

const getProducts  = async (req, res) => {
    
    const products = await stock.showProducts();
    
    res.json(products)
}

// Agregar un producto (ADMIN)

const postProduct = async (req,res)=>{

    const newItem = {
        id :  await getLenArr('db/products.txt'),
        timestamp : new Date(),
        name : req.body.name,
        description : req.body.description,
        code : req.body.code, 
        thumbnail : req.body.thumbnail,
        price : req.body.price,
        stock : req.body.stock
    }

    const hasMissingKeys = productHasMissingKeys(newItem)

    if (admin) {

        if( !hasMissingKeys ){
            const newProduct = new Product(newItem.id,newItem.timestamp,newItem.name,newItem.description,newItem.code,newItem.thumbnail,newItem.price,newItem.stock);
            const response = await stock.addProduct(newProduct);
            res.json(response);
        }
        else{
            res.status(400).json({error: -1, descripción: `Envie todos los campos del nuevo producto`});
        }
    } 
    else {
        res.status(401).json({error: -1, descripción: `ruta /products método "POST" no autorizada`});
    }
}

//Actualizar un producto (ADMIN)

const putProduct = async (req,res) => {

    const newItem = {
        id :  req.params.id,
        timestamp : new Date(),
        name : req.body.name,
        description : req.body.description,
        code : req.body.code, 
        thumbnail : req.body.thumbnail,
        price : req.body.price,
        stock : req.body.stock
    }

    console.log(newItem)

    const hasMissingKeys = productHasMissingKeys(newItem)

    if (admin) {

       if(!hasMissingKeys){
           const response =  await stock.updateProduct(newItem)
           res.json(response);
       }
       else{
           
            res.status(400).json({error: -1, descripción: `Envie todos los campos del nuevo producto`});
       }

    } else {
        res.status(401).json({error: -1, descripción: `ruta /products método "PUT" no autorizada`});
    }
}


//Borrar producto (ADMIN)

const deleteProduct = async (req,res) => {
    if (admin) {

        const productDeleted = await stock.deleteProduct(req.params.id);
        res.json(productDeleted);

    } else {

        res.status(401).json({error: -1, descripción: `ruta /products método "DELETE" no autorizada`});
    }
}

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
}