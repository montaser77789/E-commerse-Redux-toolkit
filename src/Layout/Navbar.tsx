'use client'

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
  
} from '@chakra-ui/react'

import React from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { IoSunnyOutline } from 'react-icons/io5'
import { Link as RouterLink } from "react-router-dom";
import CookiesServices from '../Services/CookiesServices'
const Links = ['Products', 'Team']




interface Props {
  children: React.ReactNode
  to: string;
}


const NavLink = (props: Props) => {
  const { to,children } = props

  return (
    <Box
      as={RouterLink}
      to={to.toLocaleLowerCase()}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Box>
  )
}


export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const token = CookiesServices.get("jwt")
const onLogout = ()=>{
  CookiesServices.remove("jwt");
  window.location.reload()
}

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
        <RouterLink to="/">My App</RouterLink>

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                 <NavLink key={link} to={`/${link.toLowerCase()}`}>
                 {link}
               </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ?<FaRegMoon />: <IoSunnyOutline />}
              </Button>

              {token? <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>: <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <RouterLink to="/login">Login</RouterLink>
              </HStack>}
              




             
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
