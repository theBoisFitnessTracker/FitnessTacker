import React, { useEffect, useState } from "react"
import {Link,Outlet} from "react-router-dom"

const HomePage = () => {
    
    

    return (
        <div>
            <div class="hometex">This is the HomePage</div>
        <nav>
            <Link class="links" to = "HomePage">HomePage</Link>
            <Link class="links" to = "RegisterPage">Register</Link>
            <Link class="links" to = "LoginPage">Login</Link>
        </nav>
        </div>
    )
}

export default HomePage;