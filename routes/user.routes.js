const { Router } = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/user.controller.js')
const { validateJWT } = require('../middlewares/validateJWT.js')
const { fieldsValidations } = require('../middlewares/fieldsValidation.js')
const { existEmail, existUserById } = require('../helpers/dbValidators.js')

const router = Router()

router.get('/', userController.list)
router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Debe ingresar un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 }),
        check('role', 'El rol del usuario es obligatorio').not().isEmpty(),
        check('email').custom(existEmail),
        fieldsValidations,
    ],
    userController.create
)
router.get('/:id', userController.show)
router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'No es un identificador único').isNumeric(),
        check('id').custom(existUserById),
        fieldsValidations,
    ],
    userController.edit
)
router.delete(
    '/:id',
    [
        validateJWT,
        check('id', 'No es un identificador único').isNumeric(),
        check('id').custom(existUserById),
        fieldsValidations,
    ],
    userController.destroy
)

module.exports = router
