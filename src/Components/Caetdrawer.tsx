import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { Iproduct } from "../interfaces";
import { useAppDispatch } from "../app/store";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../app/Slices/features/CartSlice";
import { BsTrash3Fill } from "react-icons/bs";

function CardInDrawer(product :Iproduct) {
  const dispatch = useAppDispatch()
  const {qty} =product
     const {title, price} =product.attributes
     const { url} =product.attributes.thumbnail.data.attributes
     
    return (
     <>
     <Flex px={"2"} mb={"2"} alignItems={"center"} >
     <Image
        src={`http://localhost:1337${url}`}
        alt={"alt"}
        objectFit="cover"
        height="80px"
        width={"80px"}
        rounded={"full"}
        m={"10px 0"}
        mr={"3"}
      />
      <Stack>
      <Text size={"sm"}>Title: {title}</Text>

        <Text size={"sm"}>price: {price}</Text>
        <Text size={"sm"}>Quantity: {qty}</Text>
        <Flex><FaPlus style={{margin:"0 10px", }} cursor={"pointer"} onClick={()=>dispatch(increaseQuantity(product))} /> <TiMinus onClick={()=>dispatch(decreaseQuantity(product))}  cursor={"pointer"} style={{margin:"0 10px"}}/></Flex>
        <Button
        variant="outline"
        w="full"
        leftIcon={<BsTrash3Fill />} 
        colorScheme="red" 
        size={"sm"} 
        onClick={()=> dispatch(removeFromCart(product))} >Remove:</Button>
      </Stack>
     </Flex>
     <Divider/>
     </>
     );
}

export default CardInDrawer;