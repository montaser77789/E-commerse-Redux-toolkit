import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axioInstance from "../../../Config/axiosInstance";
import { createStandaloneToast } from "@chakra-ui/react";
const {toast} =createStandaloneToast()

type MyActionPayload = {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
  // يمكنك تحديد المزيد من الخصائص إذا لزم الأمر
};
interface Ilogin {
  data: [];
  loading: boolean;
  error: string;
}
const initialState: Ilogin = {
  data: [],
  loading: false,
  error: "",
};
export interface Iuser{
    identifier:string,
    password:string
}

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user:Iuser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axioInstance.post("/auth/local",user);
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        toast({
          title:"Logged in successfully" ,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = (action.payload as MyActionPayload).response.data.error.message;
        toast({
          title:(action.payload as MyActionPayload).response.data.error.message ,
          description: "Make sure you have the correct email or password",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
  },

  // extraReducers:{
  //     [`${userLogin.pending}`]:(state) => {
  //         state.loading = true
  //     },
  //     [`${userLogin.fulfilled}`]:(state,action)=>{
  //         state.loading = true,
  //         state.data = action.payload
  //         state.error = null
  //     }, [`${userLogin.rejected}`]:(state,action)=>{
  //         state.loading = true,
  //         state.data = []
  //         state.error = action.payload
  //     }
  // }
});

export default loginSlice.reducer;
