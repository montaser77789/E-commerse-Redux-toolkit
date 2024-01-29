import {  Grid } from "@chakra-ui/react";
import Productcart from "../Components/Productcart";
import {  Iproduct } from "../interfaces";
import UseAuthenticatedQuery from "../Hooks/UseAuthenticatedQuery";

function Products() {

    const { data ,isLoading} = UseAuthenticatedQuery({
        queryKey: ["products"],
        url: "/products?populate=thumbnail,catagory",
      });


  



if(isLoading) return <h3>Loading...</h3>
    // useEffect(()=>{
    //     try {
    //          axioInstance.get("/products?populate=thumbnail,catagory").then(res=> setProducts(res.data.data)
    //          ).then(error =>console.log(error))
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },[])
    return ( <>
    <Grid  margin={30} templateColumns={"repeat(auto-fill ,minmax(300px,1fr))"} gap={6}>
    {data?.data.map((product :Iproduct) =>(
    <Productcart key={product.id} product={product} />
    ))}
    </Grid>
    </> 
    );
}

export default Products;