
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from '@chakra-ui/react'
import React, {  useState } from 'react'
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

export default function Login() {
  const [isEmail, setisEmail] = useState(false);
  const [isPassword, setisPassword] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    console.log(user);
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value,name} = e.target;
        setUser({...user,[name]:value})
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log("Done");
      if(!isEmail){
        setisEmail(true)
        return;
      } if(!isPassword){
        setisPassword(true)
        return;
      }
      setisEmail(false)
      setisPassword(false)


    };
    
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text display={"flex"} fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool  <Text color={'blue.400'}  ml={2}> features</Text> ✌️
          </Text>
        </Stack>
        <Box
          as='form'
          onSubmit={onSubmitHandler}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"
              name='email'
              onChange={onChangeHandler}
              value={user.email}
              isInvalid={isEmail}
              errorBorderColor='crimson'
               />
                  
          {isEmail?  (<FormHelperText color={"red"}>Email is required. </FormHelperText>):null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                name='password'
                value={user.password}
                onChange={onChangeHandler}
                isInvalid={isPassword}
                errorBorderColor='crimson'
                              />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <BiSolidHide  /> : <BiSolidShow />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isEmail?  (<FormHelperText color={"red"}>Password is required. </FormHelperText>):null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
              bg ={ isEmail || isPassword ? 'red.400'  :  'blue.400'}
                color={'white'}
                _hover={{
                  bg : isEmail || isPassword ? 'red.500'  :  'blue.500'
                }}
                type='submit'>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}