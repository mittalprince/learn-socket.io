var express = require('express')
var socket = require('socket.io')

var port = process.env.PORT || 8000
var app = express()

app.use(express.static('public'))

var server = app.listen(port,()=>{
    console.log(`Server starts on port ${port}`)
})

var io =socket(server)

io.on('connection',(socket)=>{
    console.log('Made socket connection ',socket.id)

    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data)
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})