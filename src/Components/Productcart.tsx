// import React from "react";
// import { Button, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { Iattributes } from "../interfaces";
// import { addToCart } from "../app/Slices/features/CartSlice";
// import { useAppDispatch } from "../app/store";


// interface ProductCardProps {
//   product: {
//     attributes: Iattributes;
    
//   };
// }


// const Productcart: React.FC<ProductCardProps> = ({ product }) => {
//   const { title, description, price } = product.attributes;
//   const {url} = product.attributes.thumbnail.data.attributes;
//   const dispatch = useAppDispatch()
  

  
//   return (
//     <Card border={"1px solid #a8b5c8"} bg={"none"}>
//       <CardBody>
//         <Image
//           src={`http://localhost:1337${url}`}
//           alt="Green double couch with wooden legs"
//           borderRadius="50%"
//           boxSize="200px"
//           margin="auto"
//         />
//         <Stack mt="6" spacing="3">
//           <Heading textAlign="center" p="2" size="md">
//             {title}
//           </Heading>
//           <Text textAlign="center" fontSize="sm">
//             {description}
//           </Text>
//           <Text color="blue.600" fontSize="2xl" textAlign="center">
//             {price}
//           </Text>
//         </Stack>
//         <Button
//           colorScheme="cyan"
//           size="xl"
//           py="5"
//           overflow="hidden"
//           w="full"
//           mt={6}
//           onClick={()=>dispatch(addToCart( product.attributes)) }
//         >
//          Add to card
//         </Button>
//         <Button
//           as={Link}
//           to={"/products/1"}
//           colorScheme="cyan"
//           size="xl"
//           py="5"
//           overflow="hidden"
//           w="full"
//           mt={6}
//         >
//           View Details
//         </Button>
//       </CardBody>
//     </Card>
//   );
// };

// export default Productcart;




import { Link } from 'react-router-dom';
import {
  Box,
  Image,
  Badge,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useAppDispatch } from "../app/store";

import React from 'react';
import {  Iproduct } from '../interfaces';
import { addToCart } from "../app/Slices/features/CartSlice";
import { motion } from 'framer-motion';


interface ProductCardProps {
  product:Iproduct
}


const Productcart: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, price,id } = product.attributes;
  const {url} = product.attributes.thumbnail.data.attributes;
  const dispatch = useAppDispatch()
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      position="relative"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image
        src={`http://localhost:1337${url}`}
        alt={title}
        objectFit="cover"
        height="200px"
        
      />

      <Box p="4">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge>

        <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {title}
        </Box>

        <Text color="gray.600" fontSize="sm" mt="1">
          {description}
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

        >
          <Button
            as={Link}
            to={`/products/${id}`}
            colorScheme="cyan"
            size="md"
          >
            View Details
          </Button>
        </motion.div>

        <Flex justify="center" mt="4">
          <Button
            colorScheme="cyan"
            size="md"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
        </Flex>

      
      </Box>
    </Box>
  );
};

export default Productcart;

