import { useState } from "react"


export default function Chatbot(){

    const query = useState("");


    return(
        <>
            <form  className="chatbot-input">
                <input className="input-area" placeholder="Type your message..." type="text"></input>
                <button type="submit"></button>
            </form>
            
        </>

    )
}