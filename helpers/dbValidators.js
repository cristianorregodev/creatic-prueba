const User = require('../models').user
const existEmail = async (email = '') => {
    // Verificar si el correo existe
    const isEmail = await User.findOne({ where: { email } })
    if (isEmail) throw new Error(`El correo: ${email} ya se encuentra registrado`)
}

const existUserById = async (id = '') => {
    // Verificar si el usuario existe
    const isUser = await User.findByPk(id)
    if (!isUser) throw new Error(`El usuario con id: ${id} no existe`)
}

module.exports = { existEmail, existUserById }
