import { Button, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useGetProductsQuery } from "../../app/Slices/features/Services/ProductApiSlice";
import { Iproduct } from "../../interfaces";
import TableSkeleton from "../../Components/TableSkeleton";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import AlertDialog from "../../Components/AlertDialog";



function DashboardProducts() {
    const {data,isLoading }=useGetProductsQuery({})
    const { isOpen, onOpen, onClose } = useDisclosure();

    
    if(isLoading) return <TableSkeleton/>

    return (<>


<TableContainer>
<Table variant='striped' colorScheme='purple'>
  <TableCaption>Imperial to metric conversion factors</TableCaption>
  <Thead>
    <Tr>
    <Th>id</Th>
      <Th>title</Th>
      <Th>Catagory</Th>
      <Th>descriptin</Th>
      <Th >thumbnail</Th>
      <Th >Price</Th>
      <Th >Stock</Th>
      <Th >Action</Th>
    </Tr>
  </Thead>
  <Tbody>
  {data?.data?.map((product:Iproduct)=>(
    <Tr>
       <Td>{product.id}</Td>
       <Td>{product.attributes.title}</Td>
      <Td>{product.attributes.catagory.data.attributes.title}</Td>
      <Td>{product.attributes.description.slice(0,20)}</Td>
      <Td > <Image
        src={`http://localhost:1337${product.attributes.thumbnail.data.attributes.url}`}
        alt={"alt"}
        objectFit="cover"
        height="50px"
        width={"50px"}
        rounded={"full"}
        m={"10px 0"}
        mr={"3"}
      />
        </Td>
      <Td>{product.attributes.price}</Td>
      <Td>{product.attributes.stock}</Td>
      <Td>
        <Button
        as={Link}
        to={`/products${product.id}`}
         mr={2} 
         colorScheme="purple" 
         variant={"solid"} 
         onClick={()=>{}}>
        <AiOutlineEye size={17}/>
        </Button>
        <Button  mr={2} colorScheme="red" variant={"solid"} onClick={onOpen}>
        <BsTrash size={17}/>
        </Button>
        <Button colorScheme="blue" variant={"solid"} onClick={()=>{}}>
        <CiEdit size={17}/>
        </Button>
        
        </Td>
    </Tr>))}
  </Tbody>
</Table>
</TableContainer>
<AlertDialog title="Are you sure?" description="Do you really want to destory this product? this product cannot undone " noCancle="Cancle" okDelete="Destory" isOpen={isOpen} onClose={onClose} onOpen={onOpen} />


    </>  );
}

export default DashboardProducts;