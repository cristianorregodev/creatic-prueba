const { Router } = require('express')
const productController = require('../controllers/product.controller.js')
const { validateJWT } = require('../middlewares/validateJWT.js')
const { check } = require('express-validator')
const { fieldsValidations } = require('../middlewares/fieldsValidation.js')

const router = Router()

router.get('/', validateJWT, productController.list)
router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('price', 'El precio del producto es obligatorio').not().isEmpty(),
        check('stock', 'El stock disponible del producto es obligatorio').not().isEmpty(),
        fieldsValidations,
    ],
    productController.create
)
router.get('/:id', productController.show)
router.put('/:id', validateJWT, productController.edit)
router.delete('/:id', validateJWT, productController.destroy)
router.get('/user/:user_id', validateJWT, productController.productsByUser)

module.exports = router
