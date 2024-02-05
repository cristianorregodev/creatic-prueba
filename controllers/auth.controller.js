const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models').user
const { generateJWT } = require('../helpers/generateJWT.js')

const login = async (req, res = response) => {
    const { email, password } = req.body

    try {
        //Verificar si el ususario esta registradoes
        const user = await User.findOne({
            where: { email },
        })
        if (!user) {
            return res.status(400).json({ message: 'El Usuario ingresado no es valido.' })
        }

        //Verificar si el usuario esta activo
        if (!user.isActive) {
            return res.status(400).json({ message: 'El usuario actualmente se encuentra inactivo.' })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: 'La Contraseña ingresada no es valida.' })
        }

        //Generar JWT
        const token = await generateJWT(user.id)

        const { id, name, role } = user
        res.json({
            user: { id, name, role, token },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal al intentar iniciar sesión. Pongase en contacto con el administrador.',
        })
    }
}

module.exports = {
    login,
}
