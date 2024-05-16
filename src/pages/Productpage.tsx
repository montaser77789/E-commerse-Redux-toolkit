import { Box, Button, Grid, Skeleton } from "@chakra-ui/react";
import Productcart from "../Components/Productcart";
import { Iproduct } from "../interfaces";
import UseAuthenticatedQuery from "../Hooks/UseAuthenticatedQuery";
import SkeletonCard from "../Components/Skeleton";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["products"],
    url: "/products?populate=thumbnail,catagory,createdAt",
  });

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  const filterProductsByCategory = (category: string) => {
    const filteredProducts = data?.data.filter(
      (product: Iproduct) =>
        product?.attributes?.catagory?.data?.attributes?.title === category
    );
    setProducts(filteredProducts || []);
  };

  const showAllProducts = () => {
    setProducts(data?.data || []);
  };

  if (isLoading) {
    return (
      <>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          margin={"80px 0px 0px 0px"}
          gap={6}
        >
          <Skeleton height="20px" width="100px" />
          <Skeleton height="20px" width="100px" />
          <Skeleton height="20px" width="100px" />
        </Box>

        <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
          {Array.from({ length: 20 }, (_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </Grid>
      </>
    );
  }

  return (
    <Box margin={"30px  30px"}>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        margin={"80px 0px 0px 0px"}
        gap={6}
        flexWrap={"wrap"}
      >

        <Button onClick={showAllProducts}>All Products</Button>
        {data?.data.map((product: Iproduct) => (
          <Button
            key={product.id}
            onClick={() =>
              filterProductsByCategory(
                product?.attributes?.catagory?.data?.attributes?.title
              )
            }
          >
            {product?.attributes?.catagory?.data?.attributes?.title}
          </Button>
        ))}
      </Box>

      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {products?.map((product: Iproduct) => (
          <Productcart key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
