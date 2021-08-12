const { readFile, writeFile } = require('fs/promises');

class Cart {

    constructor(cart) {
        this.cart = cart;
    }

    showCartById = async (id) => {
        try{

            const data = await readFile('db/cart.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            const filteredById = parsedProducts.filter(product => product.id == id)
    
            if(filteredById.length>0){
                return filteredById
            }else{
                return {error : 'producto no encontrado'}
            }
        }
        catch(err){
            console.log(err)
        }
    }

    addToCart = async (product) => {
        try{
            const data = await readFile('db/cart.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            parsedProducts.push(product)
            await writeFile('db/cart.txt', JSON.stringify(parsedProducts, null, '\t')) 
            
        }catch(err){
            console.log(err)
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
                    return({error : 'producto no encontrado'})
                }
        }
        catch(err){
            console.log(err)
        }
    }

}
module.exports = { Cart }