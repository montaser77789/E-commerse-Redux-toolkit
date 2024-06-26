import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Box p="4">
      <Flex
        style={{ height: "80vh", content: "center", margin: "auto" }}
        direction="column"
        align="center"
        justify="center"
        h="80vh"
      >
        <Heading as="h1" textAlign="center" fontSize="4xl" mb="4">
          Welcome to Our E-Commerce Store
        </Heading>
        <Text fontSize="lg" mb="8" textAlign="center">
          Discover the latest trends in fashion and shop with confidence.
        </Text>
      </Flex>
    </Box>
  );
};

export default Homepage;
