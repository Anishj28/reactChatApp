import React, { useState } from 'react'
import "./Join.css"
import { Link } from 'react-router-dom'

let user;

const Join = () => {

    const sendUser=()=>{
        user=document.getElementById('joinIn').value;
        document.getElementById('joinIn').value = "";
    }

    const [name,setName]=useState("");
    console.log(name)
    return (
        <div className="joinPage">
            <div className="joinContainer">
                <h1 className="title">Chat Buddy</h1>
                <p className="greeting">Welcome</p>
                <input type="text" id="joinIn" className="joinIn" placeholder="Enter details" onChange={(e)=>setName(e.target.value)} />
                <Link to="./chat" onClick={(e)=> !name ? e.preventDefault():null} >
                    <button onClick={sendUser} className="loginBtn">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
export {user};