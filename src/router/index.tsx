import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Products from "../pages/Productpage";
import Homepage from "../pages/Homepage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/">
            <Route path="productpage" element={<Products/>}/>
            <Route path="homepage" element={<Homepage/>}/>
        </Route>
        </>
    )
)
export default router