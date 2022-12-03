import React from "react";
import ReactDOM from "react-dom"; 

import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";
import RegisterPage from "./RegisterPage";
import Activities from "./Activities";
import HomePage from "./HomePage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/LoginPage",
                element: <LoginPage />
            },
           
            {
                path: "/RegisterPage",
                element: <RegisterPage/>
            },
           
          
        ]
    }
])

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("app"))