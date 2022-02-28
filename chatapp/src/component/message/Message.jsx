import React from 'react'
import "./message.css"

export default function Message({user,message,clas}) {

    console.log(user)
    if(user){
         return(
             <div className={ `box ${clas}`}>
            {`${user}: ${message}`}
        </div>
         )
    }
    else
    {
        return (
        <div className={ `box ${clas}`}>
            {` You: ${message}`}
        </div>
    )
    }
}
