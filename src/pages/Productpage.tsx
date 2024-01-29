import { Grid } from "@chakra-ui/react";
import Productcart from "../Components/Productcart";
import { Iproduct } from "../interfaces";
import UseAuthenticatedQuery from "../Hooks/UseAuthenticatedQuery";
import Skeleton from "../Components/Skeleton";

function Products() {
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["products"],
    url: "/products?populate=thumbnail,catagory",
  });

  if (isLoading) {
    return (
      <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {Array.from({ length: 20 }, (_, idx) => (
          <Skeleton key={idx} />
        ))}
      </Grid>
    );
  }

  // Render products when data is available
  return (
    <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
      {data?.data.map((product: Iproduct) => (
        <Productcart key={product.id} product={product} />
      ))}
    </Grid>
  );
}

export default Products;
