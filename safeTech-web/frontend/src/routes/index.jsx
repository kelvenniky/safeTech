import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import Overview from '../pages/Overview';
import Actions from '../pages/Actions';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import Users from '../pages/Users';
import Maps from '../pages/Maps';
import GetUserDetails from '../pages/GetUserDetails';
import Reports from '../pages/Reports';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children :[
            {
                path: "",
                element: <Navigate to="overview" />, // Initial redirect to home
            },
            {
            path: "",
            element:<Home/>,
            children :[
                {
                    path: "overview",
                    element:<Overview/>
                },
                {
                    path: "actions",
                    element:<Actions/>
                },
                {
                    path: "messages",
                    element:<Messages/>
                },
                {
                    path: "settings",
                    element:<Settings/>
                },
                {
                    path: "users",
                    element:<Users/>,
                    
                },
                {
                    path:"user/:id",
                    element:<GetUserDetails/>
                },
               

                {
                    path: "reports",
                    element:<Reports/>
                },
                {
                    path: "maps",
                    element:<Maps/>
                },
              
            

            
            ]
            },
            {
                path: "login",
                element:<Login/>
            },
            
            {
                path: "forgot-password",
                element:<ForgotPassword/>
            },
            
        ]
    },
   
    {
        path: "signUp",
        element:<SignUp/>
    }
]);

export default router;