import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "../pages/Login"
import NotFound from '../pages/NotFound'
import Signup from '../pages/Signup'
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import CreateTask from "../pages/CreateTask";

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
            path: "/create-task",
            element: (
              <ProtectedRoute>
                <CreateTask />
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