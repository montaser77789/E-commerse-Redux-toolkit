import {
  Tr,
  Td,
  Skeleton,
  Table,
 
} from '@chakra-ui/react';

// Mock Data


const TableSkeleton: React.FC = () => {



  return (

    Array.from({length:5},(_,idx)=>(
<Table mt="4" key={idx}  variant='striped' colorScheme='purple'>
  <Tr>
    <Td>
      <Skeleton background={"red"} height="5px" width="100px" />
    </Td>
    <Td>
      <Skeleton color={"red"} height="5px" width="100px" />
    </Td>
    <Td>
      <Skeleton height="5px" width="100px" />
    </Td>
    <Td>
      <Skeleton height="5px" width="100px" />
    </Td>
    <Td>
    <Skeleton height="30px" width="80px" />    </Td>
    <Td>
    <Skeleton height="30px" width="80px" />    </Td>
  </Tr>
</Table>
    ))


  );
};

export default TableSkeleton;
