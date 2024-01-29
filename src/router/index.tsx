import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Products from "../pages/Productpage";
import Homepage from "../pages/Homepage";
import RootLayout from "../Layout/RootLatOut";
import Login from "../pages/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Homepage/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="login" element={<Login/>}/>

        </Route>
        </>
    )
)
export default router