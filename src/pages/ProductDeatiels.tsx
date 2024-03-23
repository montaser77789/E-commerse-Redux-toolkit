import { Image, Text, Flex, Box } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UseAuthenticatedQuery from "../Hooks/UseAuthenticatedQuery";

function ProductDetails() {
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();
  const { data } = UseAuthenticatedQuery({
    queryKey: ["product", `${productId}`],
    url: `/products/${productId}?populate=thumbnail,catagory,createdAt`,
  });

  const toNavigate = () => navigate(-1);
  if (!data) {
    return <Text>No data available</Text>;
  }

  return (
    <>
      <Box
        marginTop={"100px"}
        onClick={toNavigate}
        cursor={"pointer"}
        display="flex"
        alignItems="center"
      >
        <FaArrowLeft size={20} style={{ marginRight: "8px" }} />
        <Text fontSize="lg" fontWeight="bold">
          Back
        </Text>
      </Box>

      <Flex direction={["column", "column", "row"]} p={4}>
        <Image
          src={data?.data.attributes.thumbnail.data?.attributes.url}
          alt={data?.data.attributes.title}
          borderRadius="md"
          maxW={["100%", "100%", "40%"]}
          mr={[0, 0, 4]}
          mb={[4, 4, 0]}
        />

        <Box flex="1">
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            {data?.data.attributes.title}
          </Text>
          <Text fontSize="lg" mb={4}>
            {data?.data.attributes.description}
          </Text>

          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Price: {data?.data.attributes.price}
          </Text>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Stock: {data?.data.attributes.stock}
          </Text>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Category: {data?.data.attributes.catagory.data?.attributes.title}
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default ProductDetails;
