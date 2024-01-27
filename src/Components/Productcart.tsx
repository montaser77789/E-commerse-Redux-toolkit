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
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
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
