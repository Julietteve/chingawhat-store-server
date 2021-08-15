const {Router} = require('express')
const router = Router()
const { getProductFromCart, postProductFromCart, deleteProductFromCart } = require('../controllers/cart')


router.get('/:id?', getProductFromCart)

router.post('/:id', postProductFromCart)

router.delete('/:id', deleteProductFromCart)

module.exports = router