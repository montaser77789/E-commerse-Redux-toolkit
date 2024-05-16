import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Box margin={"0 30px"} paddingTop={50} padding="6" boxShadow="lg" bg="white" marginTop={70}>
      
      <Stack>
        <Skeleton height="200px" width={"100%"} />
      </Stack>

      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};
export default SkeletonCard;
