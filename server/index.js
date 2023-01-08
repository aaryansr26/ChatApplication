const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {

    console.log("User has joined the server!")

    socket.on('join', ( {name, room} , callback) => {

        const {error, user} = addUser({ id : socket.id, name, room }); 
        if(error) return callback(error); 

        //message event to the user when he/she joins a room
        socket.emit('message', {user : 'admin', text: `${user.name}, welcome to the room ${user.room}`});

        //message event to everyone in the room that user has joined the room
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined`}); 

        socket.join(user.room);

        callback(); 
    }); 

    //event for message sending
    socket.on('sendMessage', (message, callback) =>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message}); 
        callback(); 
    })

    socket.on('disconnect', () => {
        console.log("User has left!");
    });
});

app.use(router); 
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

