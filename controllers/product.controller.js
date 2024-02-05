const Product = require('../models').product
const list = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json({
            status: 'ok',
            data: products,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error,
        })
    }
}

const create = async (req, res) => {
    const { user } = req
    const productData = req.body
    const product = new Product(productData)
    product.user_id = user.id
    await product.save()
    res.json({
        status: 'ok',
        data: product,
    })
}

const show = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByPk(id)
        res.json({
            status: 'ok',
            data: product,
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
    try {
        await Product.update(req.body, { where: { id } })
        res.json({
            status: 'ok',
            data: await Product.findByPk(id),
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error,
        })
    }
    res.json({
        status: 'ok',
    })
}

const destroy = async (req, res) => {
    const { id } = req.params
    await Product.destroy({ where: { id } })
    res.status(204).json({
        status: 'ok',
    })
}

const productsByUser = async (req, res) => {
    const { user_id } = req.params
    const products = await Product.findAll({ where: { user_id } })
    res.json({
        status: 'ok',
        data: products,
    })
}

module.exports = { list, create, show, edit, destroy, productsByUser }
