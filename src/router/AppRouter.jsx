import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "../pages/Login"
import NotFound from '../pages/NotFound'
import Signup from '../pages/Signup'
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import TaskDetail from "../pages/TaskDetail";


const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/dashboard",
            element:(
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            )
        },
        {
            path:"/dashboard",
            element:(
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            )
        },
        {
            path: "/task/:id",
            element: (
              <ProtectedRoute>
                <TaskDetail />
              </ProtectedRoute>
            )
        },
        {
         path:"*",
         element: <NotFound/> 
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouter