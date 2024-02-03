import {
    AlertDialog as ChakraAlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
  } from "@chakra-ui/react";
import React, { RefObject } from "react";
interface Ipropse {
    onOpen:()=>void
    isOpen: boolean;
    onClose: () => void;
    title:string
    description:string
    noCancle:string
    okDelete:string
    Desert:()=>void
    isLoading:boolean
  }


function AlertDialog({isOpen,onClose,title,description,noCancle,okDelete,Desert,isLoading }:Ipropse) {
    const cancelRef: RefObject<HTMLButtonElement> = React.useRef(null);
  
    return (
      <>
        <ChakraAlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
             {description}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
               {noCancle}
              </Button>
              <Button onClick={Desert} isLoading={isLoading} variant={"outline"} colorScheme='red' ml={3}>
                {okDelete}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </ChakraAlertDialog>
      </>
    )
  }
  export default AlertDialog