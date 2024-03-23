import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";
import CookiesServices from "../Services/CookiesServices";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import DrawerExample from "../Components/Drawer";
import { onOpenCartDrawer } from "../app/Slices/features/glopalSlice";

const userCookie = CookiesServices.get("user");
const user = userCookie ? userCookie.user : false;
const confirmed = user ? user.confirmed : false;

const Links = ["Products"];

interface Props {
  children: React.ReactNode;
  to: string;
}

const NavLink = (props: Props) => {
  const { to, children } = props;
  return (
    <Box
      as={RouterLink}
      to={to.toLocaleLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookiesServices.get("jwt");
  const onLogout = () => {
    CookiesServices.remove("jwt");
    CookiesServices.remove("user");
    window.location.reload();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const openDrawer = () => {
    dispatch(onOpenCartDrawer());
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      top={0}
      zIndex={10}
      w="100%"
      px={4}
      position={"fixed"}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={["column", "row"]}
      >
        <HStack spacing={8} alignItems={"center"} mt={[4, 0]}>
          <RouterLink to="/">My App</RouterLink>
          {!confirmed && user && <RouterLink to="/dashboard">Dashboard</RouterLink>}
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link} to={`/${link.toLowerCase()}`}>
                {link}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {token ? <Button onClick={openDrawer}>cart({cartProducts.length})</Button> : null}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <FaRegMoon /> : <IoSunnyOutline />}
            </Button>
            {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </Center>
                  <Center>
                    <p>Username</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex>
                <Button mr={2} as={RouterLink} to="/login">
                  Sign in
                </Button>
                <Button as={RouterLink} to="/register">
                  Sign up
                </Button>
              </Flex>
            )}
          </Stack>
          <DrawerExample />
        </Flex>
      </Flex>
      <IconButton
        size="md"
        icon={isOpen ? <IoCloseSharp size={"30px"} style={{ margin: "auto"}}/> : <GiHamburgerMenu size={"30px"} style={{ margin: "auto" }}/>}
        aria-label="Open Menu"
        display={{ base: "block", md: "none" }}
        onClick={isOpen ? onClose : onOpen}
      />
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link} to={`/${link.toLowerCase()}`}>
                {link}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
