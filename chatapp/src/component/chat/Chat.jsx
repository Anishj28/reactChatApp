import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import socketIo from "socket.io-client"
import "./chat.css"
import Message from "../message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom"

let socket;
const DEST="http://localhost:4500/"

export default function Chat() {
    const [id,setId]=useState("");
    const [msgs,setMsgs]=useState([]);
    const sendMessage=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";
    }


    useEffect(()=>{
        socket = socketIo(DEST,{transports:['websocket']})

        socket.on("connect",()=>{
            console.log("connected");
            setId(socket.id);
        })

        socket.emit('joined',{user})

        socket.on('welcome',(data)=>{
            setMsgs([...msgs,data]);
            console.log(data.user,data.message);
        })

        socket.on('userJoined',(data)=>{
            setMsgs([...msgs,data]);
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
            setMsgs([...msgs,data]);
            console.log(data.user,data.message);
        })

        return ()=>{
            socket.emit("disconnect");
            socket.off();
        }
    },[]);

    useEffect(()=>{
        socket.on('sendMessage',(data)=>{
            setMsgs([...msgs,data])
            console.log(data.user,data.message,data.id);
        })

        return ()=>{
            socket.off();
        }
    },[msgs]);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <p className="brand">ChatBuddy</p>
                    <a href="/" className="close">X</a>
                </div>
                <br />
                <ReactScrollToBottom className="chatBox">
                    {
                        msgs.map((x,i)=>(
                            <Message  user={x.id === id?null:x.user} message={x.message} clas={x.id === id? 'right':'left' } ></Message>
                        ))
                    }
                </ReactScrollToBottom>
                <div className="input">
                    <input  onKeyPress={(e)=>e.key === 'Enter' ? sendMessage():''} type="text" id="chatInput" className="sendIn" />
                    <button onClick={sendMessage} className="sendBtn">Send</button>
                </div>
            </div>
        </div>
    )
}
