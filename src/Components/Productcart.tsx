import { Link } from "react-router-dom";
import { Box, Image, Badge, Text, Button, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../app/store";

import React from "react";
import { Iproduct } from "../interfaces";
import { addToCart } from "../app/Slices/features/CartSlice";
import { motion } from "framer-motion";
import { AiOutlineEye } from "react-icons/ai";

interface ProductCardProps {
  product: Iproduct;
}

const Productcart: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, price } = product.attributes;

  const dispatch = useAppDispatch();

  const addCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <Box
      maxW="md"
      w={"sm"}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      position="relative"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      mt={20}
    >
      <Image
        p={2}
        src={`http://localhost:1337${product.attributes.thumbnail.data?.attributes.url}`}
        alt={title}
        height="300px"
        w={"100%"}
      />

      <Box p="4">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge>
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title.slice(0, 30)}...
        </Box>
        <Text color="gray.600" fontSize="sm" mt="1">
          {description.slice(0, 50)}...
        </Text>
        <Text color="blue.700" fontSize="lg" fontWeight="bold" mt="2">
          {price}
        </Text>
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "md",
          }}
        ></motion.div>
        <Flex justifyContent={"space-between"} mt="4">
          <Button colorScheme="cyan" size="md" onClick={() => addCart()}>
            Add to Cart
          </Button>
          <Button
            mr={2}
            colorScheme="purple"
            variant={"solid"}
            as={Link}
            to={`/product/${product.id}`}
          >
            <AiOutlineEye size={17} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Productcart;
