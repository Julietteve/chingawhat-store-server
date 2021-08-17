const { readFile, writeFile } = require('fs/promises');

class Products {

    constructor(product) {
        this.product = product;
    }

    showProducts = async (id = undefined) => {
        try{
            const data = await readFile('db/products.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)

            
            const error = {error : `El producto con ID ${id} no existe`}

            if( id === undefined ){
                return parsedProducts
            }
            else{
                
                const filteredById = parsedProducts.filter(product => product.id == id)

                const response = {
                    data: filteredById
                }
    
                if(filteredById.length>0){
                    return response
                }else{
                    return error
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

    addProduct = async (product) => {

        const response = {
            msg : `Producto ID ${product.id}, ${product.name}: ${product.description} agregado`
        }

        try{
            const data = await readFile('db/products.txt', 'utf-8')
            const parsedProducts = JSON.parse(data)
            parsedProducts.push(product)
            await writeFile('db/products.txt', JSON.stringify(parsedProducts, null, '\t')) 

            return response

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
            
            const response = {
                    msg: ` Producto actualizado correctamente`,
                    data : product
            }

                if( index >= 0){
                   return(response)
                }
                else{
                    return({error : `Producto con id ${product.id} no encontrado`})
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
            
            const response = {
                msg: ` Producto ID:${id} eliminado`,
                data : parsedProducts[index]
            }

            const error ={ error : 'producto no encontrado' }
            
            await writeFile('db/products.txt', JSON.stringify(deleted, null, '\t')) 
                if( index >= 0 ){
                    return response
                }
                else{
                    return error
                }
        }
        catch(err){
            console.log(err)
        }
    }

}
module.exports = { Products }