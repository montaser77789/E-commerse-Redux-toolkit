"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,

} from "@chakra-ui/react";
import { useState } from "react";
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { IuserRegister } from "../interfaces";
import { userRegister } from "../app/Register";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const { loading } = useSelector((state: RootState) => state.register);

  const [user, setUser] = useState<IuserRegister>({
    username: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  console.log(user);
  const onSubmitHandler = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(userRegister(user));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      mt={5}
    >
      <Stack  spacing={8} mx={"auto"} width={"100%"} maxW={"md"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
        
          as="form"
          onSubmit={onSubmitHandler}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} >
            <Box w={"100%"}>
              <FormControl id="username" isRequired>
                <FormLabel>User name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={onChangeHandler}
                />
              </FormControl>
            </Box>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  name="password"
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <BiSolidHide size={"20px"} />
                    ) : (
                      <BiSolidShow />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
               bg={'blue.400'}
               color={'white'}
               _hover={{
                 bg: 'blue.500',
               }}
                isLoading={loading}
                loadingText="Submitting"
                type="submit"
                size="lg"
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link to={"/login"} style={{color:"#7b7bff"}}  >Sign in</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
