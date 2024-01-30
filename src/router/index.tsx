import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Products from "../pages/Productpage";
import Homepage from "../pages/Homepage";
import RootLayout from "../Layout/RootLatOut";
import Login from "../pages/Login";
import CookiesServices from "../Services/CookiesServices";
import ProtectedRoute from "../auth/ProtectRouter";


const token = CookiesServices.get("jwt")

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Homepage/>}/>
            <Route path="products" element={<Products/>}/>
            <Route  path="login" element={<ProtectedRoute isAllowed={!token} redirectPath="/">
        <Login/>
        </ProtectedRoute>}/>
        </Route>



       
        </>
    )
)
export default router