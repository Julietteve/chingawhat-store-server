const ProductDB  = require('../models/product')
const { productHasMissingKeys } = require("../utils");


const  product  = new ProductDB;

const admin = true;
 
// Listar producto por ID

const getProducts  = async (req, res) => {

    const { id } = req.params;

    if(id != null){
        const currentProduct = await product.getById(id)
          if (currentProduct) {
            return res.json(currentProduct);
          }
          res.status(404).json({
            error: "Producto no encontrado",
          });
    }
    else{
        const products = await product.get()
        if (!products) {
          return res.status(404).json({
            error: "No hay productos cargados",
          });
        }
        res.json(products);
    }

}

// Agregar un producto (ADMIN)

const postProduct = async (req,res)=>{

   const data = req.body;

    const hasMissingKeys = productHasMissingKeys(data)

    if (admin) {

        if( !hasMissingKeys ){
            const response = await product.add(data);
            res.status(200).json(response);
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

    const { id } = req.params;
    const data = req.body;

    const hasMissingKeys = productHasMissingKeys(data)

    if (admin) {

       if(!hasMissingKeys){
           const response =  await product.update(id, data)
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

    const { id } = req.params;
    const currentProduct = await product.getById(id);

    if (admin) {
        res.json(currentProduct);
        await product.remove(id);

    } else {
        res.status(401).json({error: -1, descripción: `ruta /products método "DELETE" no autorizada`});
    }
}

const getByCode = async (req,res) => {
  const data = req.body;
  console.log(data);
  const { codigo } = req.params;
  // console.log(codigo)
  const currentProduct = await product.getByCode(codigo.toString())

    if (currentProduct) {
      return res.json(currentProduct);
    }
    res.status(404).json({
      error: "Producto no encontrado",
    });
}

const getByPrice = async (req,res) => {

  const { precioInferior } = req.params;
  const { precioSuperior } = req.params;

  if(precioInferior == null || precioSuperior == null){
    res.status(400).json({
      error: "Precio max y min son requeridos",
    });
  }
  else{
    // console.log(req.params)
    const products = await product.getByPriceRange(precioInferior , precioSuperior)
    
    if (products) {
      return res.json(products);
    }
    res.status(404).json({
      error: "Productos con rango especificado no encontrado",
    });
  }

}

const getByName = async (req,res) => {

    const { nombre } = req.params;

    const name = nombre.toLowerCase()
    // console.log(nombre)
    const currentProduct = await product.getByName(nombre)
    // console.log(currentProduct)
      if (currentProduct) {
        return res.json(currentProduct);
      }
      res.status(404).json({
        error: "Producto no encontrado",
      });

}

const getByCategory = async (req,res) => {

  const { id } = req.params;
  // console.log(nombre)
  const currentProduct = await product.getByCategory(id)
  // console.log(currentProduct)
    if (currentProduct) {
      return res.json(currentProduct);
    }
    res.status(404).json({
      error: "Producto no encontrado",
    });

}

const getByStock = async (req,res) => {
    const { stockInferior } = req.params;
    const { stockSuperior } = req.params;
    // console.log(req.params)


    const products = await product.getByStockRange(stockInferior , stockSuperior)

    if(stockInferior == null || stockSuperior == null){
      res.status(400).json({
        error: "Stock max y min son requeridos",
      });
    }
    else{
      if (products) {
          return res.json(products);
        }
        res.status(404).json({
          error: "Productos con rango especificado no encontrado",
        });
    }
}

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    getByPrice,
    getByName,
    getByCode,
    getByStock,
    getByCategory
}