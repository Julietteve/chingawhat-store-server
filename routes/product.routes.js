const {Router} = require('express')
const router = Router()
const { postProduct, putProduct, deleteProduct, getProducts, getByCode, getByPrice, getByName, getByStock, getByCategory } = require('../controllers/products')

router.get('/:id?', getProducts)

router.post('/', postProduct)

router.put('/:id', putProduct)

router.delete('/:id', deleteProduct)

router.get('/codigo/:codigo', getByCode)

router.get ('categoria/:categoriaId', getByCategory)

router.get('/nombre/:nombre', getByName)

router.get('/precio/:precioInferior/:precioSuperior', getByPrice)

router.get('/stock/:stockInferior/:stockSuperior', getByStock)

module.exports = router