const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // where your frontend runs
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
        // server receives message and emit waiting for frontend to listen
    })
})

server.listen(5000, () => {
    console.log('your server is ready')
})