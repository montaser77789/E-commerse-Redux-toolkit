import {  Grid } from "@chakra-ui/react";
import Productcart from "../Components/Productcart";
import { useEffect, useState } from "react";
import axioInstance from "../Config/axiosInstance";
import {  Iproduct } from "../interfaces";

function Products() {
    const [res, setRes] = useState<Iproduct[]>([]);
    useEffect(()=>{
        try {
             axioInstance.get("/products?populate=thumbnail,catagory").then(res=> setRes(res.data.data)
             ).then(error =>console.log(error))
        } catch (error) {
            console.log(error);
        }
    },[])
    return ( <>
    <Grid  margin={30} templateColumns={"repeat(auto-fill ,minmax(300px,1fr))"} gap={6}>
    {res.map((product :Iproduct) =>(
    <Productcart key={product.id} product={product} />
    ))}
    </Grid>
    </> 
    );
}

export default Products;