import React from "react";
import { Button, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Iattributes } from "../interfaces";


interface ProductCardProps {
  product: {
    attributes: Iattributes;
    
  };
}


const Productcart: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, price } = product.attributes;
  const {url} = product.attributes.thumbnail.data.attributes
  

  
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={`http://localhost:1337${url}`}
          alt="Green double couch with wooden legs"
          borderRadius="50%"
          boxSize="200px"
          margin="auto"
        />
        <Stack mt="6" spacing="3">
          <Heading textAlign="center" p="2" size="md">
            {title}
          </Heading>
          <Text textAlign="center" fontSize="sm">
            {description}
          </Text>
          <Text color="blue.600" fontSize="2xl" textAlign="center">
            {price}
          </Text>
        </Stack>
        <Button
          as={Link}
          to={"/products/1"}
          colorScheme="cyan"
          size="xl"
          py="5"
          overflow="hidden"
          w="full"
          mt={6}
        >
          View Details
        </Button>
      </CardBody>
    </Card>
  );
};

export default Productcart;
