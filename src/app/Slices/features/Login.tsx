import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axioInstance from "../../../Config/axiosInstance";
import { createStandaloneToast } from "@chakra-ui/react";
import CookiesServices, { Ioptions } from "../../../Services/CookiesServices";

const { toast } = createStandaloneToast();

type MyActionPayload = {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
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
export interface Iuser {
  identifier: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: Iuser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axioInstance.post("/auth/local", user);
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
        const IN_DAYS = 3;
        const EXPIRE_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        const date = new Date();
        date.setTime(date.getTime() + EXPIRE_IN_DAYS);
        const options: Ioptions = { path: "/", expires: date };
        CookiesServices.set("jwt", action.payload.jwt, options);
        CookiesServices.set("user", action.payload, options);

        toast({
          title: "Logged in successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = (
          action.payload as MyActionPayload
        ).response.data.error.message;
        toast({
          title: (action.payload as MyActionPayload).response.data.error
            .message,
          description: "Make sure you have the correct email or password",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
