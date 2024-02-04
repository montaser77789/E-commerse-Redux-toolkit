import { Image, Text, Flex, HStack, Box } from "@chakra-ui/react";
import UseAuthenticatedQuery from "../Hooks/UseAuthenticatedQuery";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ProductDeatiels() {
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();
  const { data } = UseAuthenticatedQuery({
    queryKey: ["product", `${productId}`],
    url: `/products/${productId}?populate=thumbnail,catagory,createdAt`,
  });
  console.log(productId);
  console.log(data?.data);
  const toNavigate = () => navigate(-1);
  return (
    <>
      <Box
        onClick={toNavigate}
        w="70%"
        pt={20}
        cursor={"pointer"}
        margin={"auto"}
        display="flex"
        alignItems="center"
      >
        <FaArrowLeft size={20} style={{ marginRight: "8px" }} />
        <Text fontSize="lg" fontWeight="bold">
          Back
        </Text>
      </Box>

      <Flex w="70%" margin={"auto"} p={4} borderRadius="md" boxShadow="md">
        <HStack minW={"40%"}>
          <Image
            w="100%"
            h="400px"
            src={`http://localhost:1337${data?.data.attributes.thumbnail.data?.attributes.url}`}
            alt={data?.data.attributes.title}
            borderRadius="md"
            objectFit="cover" // Use objectFit to maintain aspect ratio
          />
        </HStack>
        <HStack>
          <Flex direction="column" justify="center">
            <HStack>
              <Flex direction="column" justify="center">
                <Text m={4}>
                  <Text mr={2} as="span" fontWeight="bold" fontSize="lg">
                    Title :
                  </Text>
                  {data?.data.attributes.title}
                </Text>
                <Text m={4}>
                  <Text mr={2} as="span" fontWeight="bold" fontSize="lg">
                    Description :
                  </Text>
                  {data?.data.attributes.description}
                </Text>

                <Text mr={2} m={4}>
                  <Text mr={2} as="span" fontWeight="bold" fontSize="lg">
                    Price :
                  </Text>
                  {data?.data.attributes.price}
                </Text>
                <Text m={4}>
                  <Text mr={2} as="span" fontWeight="bold" fontSize="lg">
                    Stock :
                  </Text>
                  {data?.data.attributes.stock}
                </Text>
                <Text m={4}>
                  <Text mr={2} as="span" fontWeight="bold" fontSize="lg">
                    Category :
                  </Text>
                  {data?.data.attributes.catagory.data?.attributes.title}
                </Text>
              </Flex>
            </HStack>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
}

export default ProductDeatiels;
