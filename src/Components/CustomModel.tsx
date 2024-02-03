import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";
interface Ipropse {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeTxt: string;
  openTxt: string;
  children: ReactNode;
  onSubmitHandler: () => void;
  isupdate: boolean;
}
export default function CustomModel({
  isOpen,
  onClose,
  children,
  title,
  closeTxt,
  openTxt,
  onSubmitHandler,
  isupdate,
}: Ipropse) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter={"blur(5px) hue-rotate(90deg)"}
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              {closeTxt}
            </Button>
            <Button
              colorScheme="blue"
              onClick={onSubmitHandler}
              isLoading={isupdate}
            >
              {openTxt}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
