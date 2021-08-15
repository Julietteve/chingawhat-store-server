const {Router} = require('express')
const router = Router()
const { postProduct, putProduct, deleteProduct, getProducts } = require('../controllers/products')

router.get('/:id?', getProducts)

router.post('/', postProduct)

router.put('/:id', putProduct)

router.delete('/:id', deleteProduct)

module.exports = router