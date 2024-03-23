import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Skeleton = () => {
  return (
    <Box       paddingTop={50}
    padding="6" boxShadow="lg" bg="white" marginTop={70}>
      <SkeletonCircle
        size="10"
        borderRadius="50%"
        boxSize="200px"
        margin="auto"
      />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};
export default Skeleton;
