import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Iattributes } from '../../../interfaces'

export interface Ipropse {
 cartProducts:Iattributes[],
}

const initialState: Ipropse = {
    cartProducts:[],

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action:PayloadAction<Iattributes>)=>{
        state.cartProducts = [...state.cartProducts, action.payload];
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions

export default cartSlice.reducer