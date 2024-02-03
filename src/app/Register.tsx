import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IuserRegister } from "../interfaces";
import axioInstance from "../Config/axiosInstance";
import {  createStandaloneToast } from "@chakra-ui/react";

const {toast} =createStandaloneToast()

interface Iregister {
    data: [];
    loading: boolean;
    error: string;
  }
  const initialState: Iregister = {
    data: [],
    loading: false,
    error: "",
  };
  type MyActionPayload = {
    response: {
      data: {
        error: {
          message: string;
        };
      };
    };
  };
  export const userRegister = createAsyncThunk("register/userRegister",
    async (user:IuserRegister, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const { data } = await axioInstance.post("auth/local/register",user);
          console.log(data);
    
          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
  )
const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(userRegister.pending,((state)=>{
            state.loading = true;
            state.error = "";
        })).addCase(userRegister.fulfilled,((state,action)=>{
            state.loading = false;
            state.data = action.payload;
            state.error = "";
            setTimeout(() => {
                window.location.replace("/login")
              }, 2000);
              toast({
                title:"You will navigate to the login page after 2 second to login" ,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            
        })).addCase(userRegister.rejected,((state,action)=>{
            state.loading = false;
            state.data = [];
            state.error = (action.payload as MyActionPayload).response.data.error.message;
            toast({
                title:(action.payload as MyActionPayload).response.data.error.message ,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              
             
        }))
    }
})



export default registerSlice.reducer;
