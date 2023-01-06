const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const PORT = process.env.PORT || 9999;

io.on('connection', (socket) => {
    console.log("We have got a new connection!!!");

    socket.on('disconnect', () => {
        console.log("User has left!");
    });
});

app.use(router); 
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
