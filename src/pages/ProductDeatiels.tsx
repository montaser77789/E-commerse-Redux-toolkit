import { Image, Text, Flex, Box } from "@chakra-ui/react";
import UseAuthenticatedQuery from "../Hooks/UseAuthenticatedQuery";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ProductDetails() {
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();
  const { data } = UseAuthenticatedQuery({
    queryKey: ["product", `${productId}`],
    url: `/products/${productId}?populate=thumbnail,catagory,createdAt`,
  });

  const toNavigate = () => navigate(-1);

  return (
    <>
      <Box
            paddingTop={50}

        onClick={toNavigate}
        w="100%"
        pt={8}
        pb={4}
        px={4}
        cursor={"pointer"}
        display="flex"
        alignItems="center"
      >
        <FaArrowLeft size={20} style={{ marginRight: "8px" }} />
        <Text fontSize="lg" fontWeight="bold">
          Back
        </Text>
      </Box>

      <Flex
        direction="column"
        align="center"
        justify="center"
        px={4}
        pt={4}
        pb={8}
      >
        <Image
          w="100%"
          h="auto"
          src={data?.data.attributes.thumbnail.data?.attributes.url}
          alt={data?.data.attributes.title}
          borderRadius="md"
          objectFit="cover"
        />

        <Flex
          direction="column"
          align="center"
          justify="center"
          w="100%"
          mt={4}
        >
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            {data?.data.attributes.title}
          </Text>
          <Text fontSize="lg" textAlign="center" mb={4}>
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
        </Flex>
      </Flex>
    </>
  );
}

export default ProductDetails;
