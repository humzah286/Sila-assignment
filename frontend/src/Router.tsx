
import {
    createBrowserRouter,
    // createRoutesFromElements,
    // Route,
    // RouterProvider,
    // Link,
    // Outlet
} from "react-router-dom";
import App from "./App";


const children = [
    {
        path: "",
        element: <h2>Hello </h2>
    },
    {
        path: "child1",
        element: <h1>Child 1</ h1 >
    },
    {
        path: "child2",
        element: <h1>Child 2 </h1>
    }
]

const router: any = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: children
    },
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
    // {
    //     path: "/signup",
    //     element: <Signup />,
    // },

]);

export default router;

