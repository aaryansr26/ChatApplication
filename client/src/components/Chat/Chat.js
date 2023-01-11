import React, { useState, useEffect } from "react";
import qs from 'query-string'; 
import io from 'socket.io-client';
import { useLocation } from "react-router-dom";
import './Chat.css'


import Infobar from "../Infobar/Infobar.js"
import Input from "../Input/Input.js"
import Messages from "../Messages/Messages.js"
import TextContainer from "../TextContainer/TextContainer";

let socket; 


const Chat = () => {

    let location = useLocation();
    const [name, setName] = useState(''); 
    const [room, setRoom] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState([]); 
    const ENDPOINT = 'http://localhost:5000/'; 

    useEffect(() => {

        const {name, room} = qs.parse(location.search);

        socket = io(ENDPOINT, {transports: ['websocket']});

        setName(name); 
        setRoom(room); 
        console.log(socket); 

        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error); 
            }
        }); 

    }, [ENDPOINT, location.search]); 


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]); 

    //function for sending messages

    const sendMessage = (event) => {

        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }; 

    console.log(message, messages); 

    return (
        <div className="outerContainer">
            <div className="container">
            <Infobar room={room}/>
            <Messages messages = {messages} name = {name} />
            <Input message = {message} setMessage={setMessage} sendMessage = {sendMessage}/>

            </div>
            <TextContainer />
        </div>
    )
}

export default Chat;