const express = require('express')
const cors = require('cors')
const { usersRoutes, productsRoutes, authRoutes } = require('../routes')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.endpoints = {
            users: '/api/users',
            products: '/api/products',
            login: '/auth',
        }

        this.middlewares()

        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.endpoints.users, usersRoutes)
        this.app.use(this.endpoints.products, productsRoutes)
        this.app.use(this.endpoints.login, authRoutes)
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}

module.exports = Server
