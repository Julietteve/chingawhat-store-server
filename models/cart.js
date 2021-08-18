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
        console.log(index)
        console.log(id)
        const addedCart = {
                id :  await getLenArr('db/cart.txt'),
                timestamp : new Date(),
                products : [parsedProducts[index]]
        }

        const addedProduct = parsedProducts[index]

        const response = {
            msg: `Carrito id ${id} registrado`,
            data : addedProduct
        }

        const error = {
            err: `Producto con id ${id} no registrado`,
        }

            try{
                if(parsedCart.length != 0){
                    if(index >= 0){
                        parsedCart[0].products.push(addedProduct)
                        await writeFile('db/cart.txt', JSON.stringify(parsedCart, null, '\t')) 
                        return response
                    }
                    else{
                        return error
                    }
                }
                else{
                    parsedCart.push(addedCart)
                    await writeFile('db/cart.txt', JSON.stringify(parsedCart, null, '\t')) 
                    return response
                }
    
            }catch(err){
                console.log(err)
            }

    }

    deleteProduct = async (id) => {
        try{
            const data = await readFile('db/cart.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            const index = parsedProducts[0].products.findIndex(product => product.id == id)
            const deleted = parsedProducts[0].products.filter(item => item.id != id)

            const addedCart = [{
                id :  await getLenArr('db/cart.txt'),
                timestamp : new Date(),
                products : deleted
            }]
    
            await writeFile('db/cart.txt', JSON.stringify(addedCart, null, '\t')) 
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