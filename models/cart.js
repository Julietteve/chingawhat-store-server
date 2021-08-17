const { readFile, writeFile } = require('fs/promises');
const { getLenArr } = require('../utils')

class Cart {

    constructor(cart) {
        this.cart = cart;
    }

    showCartById = async ( id = undefined ) => {
        
        try{
            const data = await readFile('db/cart.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)

            if( id != undefined ){

                const filteredById = parsedProducts.filter(product => product.id == id)
               
                if( filteredById.length>0 ){
                    return filteredById
                }else{
                    return {error : 'producto no encontrado'}
                }
            }
            else{
                return parsedProducts
            }
        }
        catch(err){
            console.log(err)
        }
    }

    addToCart = async (id) => {

        const products = await readFile('db/products.txt', 'utf-8')
        const cart = await readFile('db/cart.txt', 'utf-8')
        const parsedProducts = JSON.parse(products)
        const parsedCart = JSON.parse(cart)
        const index = parsedProducts.findIndex(item => item.id == id)
        
        const addedProduct = {
                id :  await getLenArr('db/cart.txt'),
                timestamp : new Date(),
                products : parsedProducts[index]
        }

        const response = {
            msg: `Carrito id ${id} registrado`,
            data : addedProduct
        }

        const error = {
            err: `Producto con id ${id} no registrado`,
        }

        if ( index >= 0 ){
            try{
                parsedCart.push(addedProduct)
                await writeFile('db/cart.txt', JSON.stringify(parsedCart, null, '\t')) 
                return response
    
            }catch{
                console.log(err)
            }
        }
        else {
            return error
        }
    }

    deleteProduct = async (id) => {
        try{
            const data = await readFile('db/cart.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            const index = parsedProducts.findIndex(product => product.id == id)
            const deleted = parsedProducts.filter(item => item.id != id)
    
            await writeFile('db/cart.txt', JSON.stringify(deleted, null, '\t')) 
                if(id != null){
                    return({
                        msg: ` Producto ID:${id} eliminado`,
                        data : parsedProducts[index]
                    })
                }
                else{
                    return({error : 'Carrito no encontrado'})
                }
        }
        catch(err){
            console.log(err)
        }
    }

}
module.exports = { Cart }