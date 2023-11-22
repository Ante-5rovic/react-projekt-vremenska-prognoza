import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import GrafPage from "../Pages/GrafPage/GrafPage";

export const router=createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {path:"",element:<HomePage/>},
            {path:"graf/:podatak",element:<GrafPage/>},
        ]
    }
])