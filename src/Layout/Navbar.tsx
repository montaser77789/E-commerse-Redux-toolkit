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

const Links = ["Products" ];

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
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      top={0}
      zIndex={10}
      w="100%"
      px={4}
      maxHeight={"60px"}
      position={"fixed"}
      display={{ base: "flex", md: "block" }}    
        justifyContent={["space-between"]}

      alignItems={"center"}
    >
 <Box height={"60px"} display={{ base: "block", md: "none" }}>
    <IconButton
      margin={"10px"}
      icon={isOpen ? <IoCloseSharp size={"30px"} style={{ margin: "auto" }} /> : <GiHamburgerMenu size={"30px"} style={{ margin: "auto" }} />}
      aria-label="Open Menu"
      display={{ base: "block", md: "none" }}
      onClick={isOpen ? onClose : onOpen}
    />
    {isOpen ? (
      <Box style={{ marginTop: "10px", padding: "10px" }} borderRadius={"lg"} bg={bgColor}>
        <Stack as={"nav"} style={{ margin: "auto" }} spacing={4}>
          {Links.map((link) => (
            <NavLink key={link} to={`/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </Stack>
      </Box>
    ) : null}
  </Box>



      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={[ "row"]}
      >
        <HStack display={ "flex" } margin={"0 10px"}  spacing={8} alignItems={"center"} mt={[4, 0]}>
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
     
    </Box>
  );
}
