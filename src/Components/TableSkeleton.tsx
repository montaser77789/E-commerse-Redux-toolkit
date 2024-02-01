import {
  Tr,
  Td,
  Skeleton,
  Table,
 
} from '@chakra-ui/react';

// Mock Data


const TableSkeleton: React.FC = () => {



  return (

    Array.from({length:6},(_,idx)=>(
<Table mt="4" key={idx}  variant='striped' colorScheme='purple'>
<Tr>
          <Td><Skeleton height="10px" width="40px" /></Td>
          <Td><Skeleton height="10px" width="80px" /></Td>
          <Td><Skeleton height="10px" width="80px" /></Td>
          <Td><Skeleton height="10px" width="120px" /></Td>
          <Td><Skeleton height="10px" width="50px" /></Td>
          <Td><Skeleton height="10px" width="60px" /></Td>
          <Td><Skeleton height="10px" width="60px" /></Td>
          <Td display={"flex"}>
            <Skeleton height="10px"mr={2} width="20px" />
          <Skeleton height="10px" mr={2} width="20px" />
          <Skeleton height="10px" width="20px" />
          </Td>
        </Tr>
</Table>
    ))


  );
};

export default TableSkeleton;
