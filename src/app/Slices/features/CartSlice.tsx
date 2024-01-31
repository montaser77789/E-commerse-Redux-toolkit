import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Iproduct } from '../../../interfaces'
import { addItemsToShopppingCard } from '../../../Utils/Function'


interface Ipropse {
    cartProducts: Iproduct[];
}
const initialState: Ipropse = {
    cartProducts:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action:PayloadAction<Iproduct>)=>{
      state.cartProducts= addItemsToShopppingCard(state.cartProducts,action.payload) 
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions

export default cartSlice.reducer