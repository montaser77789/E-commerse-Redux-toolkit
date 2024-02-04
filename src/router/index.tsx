import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Products from "../pages/Productpage";
import Homepage from "../pages/Homepage";
import RootLayout from "../Layout/RootLatOut";
import Login from "../pages/Login";
import CookiesServices from "../Services/CookiesServices";
import ProtectedRoute from "../auth/ProtectRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardProducts from "../pages/Dashboard/DasgboardProducts";
import Register from "../pages/Register";
import ProductDeatiels from "../pages/ProductDeatiels";



const token = CookiesServices.get("jwt")
const user = CookiesServices.get("user")
const { confirmed}= user.user



const router = createBrowserRouter(

    createRoutesFromElements(
        <>
     <Route path="/" element={<RootLayout/>}>
            <Route index element={<Homepage/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="product">
            <Route path={":productId"} element={<ProductDeatiels/>}/>
            </Route>

            
            <Route  path="login" element={<ProtectedRoute isAllowed={!token} redirectPath="/">
        <Login/>
        </ProtectedRoute>}/>
        <Route  path="register" element={<ProtectedRoute isAllowed={!token} redirectPath="/register">
        <Register/>
        </ProtectedRoute>}/>
        </Route>

  { !confirmed &&     <Route path="/dashboard" element={<DashboardLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="products" element={<DashboardProducts/>}/>
        <Route path="catagory" element={<h3>catagory</h3>}/>
        </Route>}
        </>
    )
)
export default router