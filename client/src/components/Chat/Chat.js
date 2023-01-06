import React, { useState, useEffect } from "react";
import qs from 'query-string'; 
import io from 'socket.io-client';
import { useLocation } from "react-router-dom";

let socket; 


const Chat = () => {

    let location = useLocation();
    const [name, setName] = useState(''); 
    const [room, setRoom] = useState(''); 
    const ENDPOINT = 'http://localhost:5000/'; 

    useEffect(() => {

        const {name, room} = qs.parse(location.search);

        socket = io(ENDPOINT, {transports: ['websocket']});

        setName(name); 
        setRoom(room); 
        console.log(socket); 

        socket.emit('join', {name, room}); 

    }, [ENDPOINT, location.search]); 

    return (
        <h1>Chat</h1>
    )
}

export default Chat;