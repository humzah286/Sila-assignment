
import {
    createBrowserRouter,
    // createRoutesFromElements,
    // Route,
    // RouterProvider,
    // Link,
    // Outlet
} from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Charts from "./components/Charts";


const children = [
    {
        path: "",
        element: <Charts />
    },
]

const router: any = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: children
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },

]);

export default router;

