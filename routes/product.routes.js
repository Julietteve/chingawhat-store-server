const {Router} = require('express')
const router = Router()
const { getProduct, postProduct, putProduct, deleteProduct, getProducts } = require('../controllers/products')


router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', postProduct)

router.put('/:id', putProduct)

router.delete('/:id', deleteProduct)

module.exports = router