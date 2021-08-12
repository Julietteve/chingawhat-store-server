const { readFile, writeFile } = require('fs/promises');

class Products {

    constructor(product) {
        this.product = product;
    }


    showProducts = async () => {
        try{
            const data = await readFile('db/products.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            return parsedProducts
        }
        catch(err){
            console.log(err)
        }

    }
    showProductById = async (id) => {
        try{
            const data = await readFile('db/products.txt', 'utf-8')
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

    addProduct = async (product) => {
        try{
            const data = await readFile('db/products.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            parsedProducts.push(product)
            await writeFile('db/products.txt', JSON.stringify(parsedProducts, null, '\t')) 
        }catch(err){
            console.log(err)
        }
    }

    updateProduct = async (product) => {
        try{
            const data = await readFile('db/products.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            const index = parsedProducts.findIndex(item => item.id == product.id)

            parsedProducts[index] = product
    
            await writeFile('db/products.txt', JSON.stringify(parsedProducts, null, '\t')) 
            
                if(id != null){
                   return({
                        msg: ` Producto conn id ${product.id} actualizado`,
                        data : product
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

    deleteProduct = async (id) => {

        try{
            const data = await readFile('db/products.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            const index = parsedProducts.findIndex(product => product.id == id)
            const deleted = parsedProducts.filter(item => item.id != id)
    
            await writeFile('db/products.txt', JSON.stringify(deleted, null, '\t')) 
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
module.exports = { Products }