const { readFile } = require('fs/promises');

const getLenArr = async (file) =>{
    try{
        const data = await readFile(file, 'utf-8')
        const parsedProducts = JSON.parse(data)
    
        return parsedProducts.length + 1;

    }catch(err){
        console.log(err)
    }
}

function productHasMissingKeys (obj){
    const hasMissingKeys = Object.values(obj).some( item => item == undefined )
    return hasMissingKeys
}

module.exports = {
    getLenArr,
    productHasMissingKeys
}