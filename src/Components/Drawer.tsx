import React from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { onCloseDrawer } from '../app/Slices/features/glopalSlice';

function DrawerExample() {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch()

  const { isOpenCartDrawer } = useSelector((state: RootState) => state.drawer);

  const onClose = () => {
    dispatch(onCloseDrawer())
  };

  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer} 
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>your shooping cart </DrawerHeader>
          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>
          <DrawerFooter>
            <Button  colorScheme='red'>Clear All</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
