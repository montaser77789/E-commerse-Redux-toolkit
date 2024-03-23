import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { onCloseDrawer } from "../app/Slices/features/glopalSlice";
import CardInDrawer from "./Caetdrawer";
import { Iproduct } from "../interfaces";
import { removeCart } from "../app/Slices/features/CartSlice";

function DrawerExample() {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const { isOpenCartDrawer } = useSelector((state: RootState) => state.drawer);
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  const onClose = () => {
    dispatch(onCloseDrawer());
  };

  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>your shooping cart </DrawerHeader>
          <DrawerBody>
            {cartProducts.length ? (
              cartProducts.map((product: Iproduct) => (
                <CardInDrawer key={product.id} {...product} />
              ))
            ) : (
              <Text p={"10px 0"} fontSize={"2xl"}>
                Your cart is empty
              </Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="red" onClick={() => dispatch(removeCart())}>
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
