const bcryptjs = require('bcryptjs')
const User = require('../models').user
const list = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json({
            status: 'ok',
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error,
        })
    }
}

const create = async (req, res) => {
    const userData = req.body

    const user = new User(userData)

    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(user.password, salt)
    await user.save()
    res.json({
        status: 'ok',
        data: user,
    })
}

const show = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)
        res.json({
            status: 'ok',
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error,
        })
    }
}

const edit = async (req, res) => {
    const { id } = req.params
    const { password, email, ...data } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        data.password = bcryptjs.hashSync(password, salt)
    }

    await User.update(data, { where: { id } })

    res.json({
        status: 'ok',
        data: await User.findByPk(id),
    })
}

const destroy = async (req, res) => {
    const { id } = req.params
    try {
        await User.update({ isActive: false }, { where: { id } })
        res.status(204).json({
            status: 'ok',
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error,
        })
    }
}

module.exports = { list, create, show, edit, destroy }
