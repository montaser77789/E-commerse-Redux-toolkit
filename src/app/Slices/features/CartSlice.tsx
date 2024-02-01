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
    },
    removeFromCart:(state,action:PayloadAction<Iproduct>)=>{
      state.cartProducts =  state.cartProducts.filter(item =>action.payload.id !==item.id  )
    },
    removeCart:(state)=>{
      state.cartProducts =  []
    },
  increaseQuantity:(state,action:PayloadAction<Iproduct>)=>{
    state.cartProducts=  state.cartProducts.map(product => (product.id == action.payload.id ?{...product,qty:product.qty+1}:product) )  
    },
    decreaseQuantity:(state,action:PayloadAction<Iproduct>)=>{
      state.cartProducts =  state.cartProducts.map(product => (product.id == action.payload.id &&action.payload.qty !=1 ?{...product,qty:product.qty-1} :product) )  
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,removeFromCart,removeCart,increaseQuantity,decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer