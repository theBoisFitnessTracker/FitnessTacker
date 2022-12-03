import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 

    async function formSubmitHandler (event) {
        event.preventDefault(); 
        try {
            const response = await fetch(
                "https://fitnesstrac-kr.herokuapp.com/api/activities",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: {
                            username: username,
                            password: password
                        }
                    })
                }
            )
            const data = await response.json(); 
            console.log("This is our translated data: ", data)

            localStorage.setItem("token", data.data.token)
        } catch (error) {
            console.log(error); 
        }
    }   

    const updateUsernameState = (event) => {
        setUsername(event.target.value)
    }
    const updatePasswordState = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <div>Username</div>
                <input type = "text" value = {username} onChange = {updateUsernameState}></input>

                <div>Password</div>
                <input type = "text" value = {password} onChange = {updatePasswordState}></input>
   
                <button type = "submit">Submit</button>
            </form>
        </div>
    )
}


export default RegisterPage;