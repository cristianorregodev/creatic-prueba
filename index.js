require('dotenv').config()
const Server = require('./app/index')
const server = new Server()

server.start()
