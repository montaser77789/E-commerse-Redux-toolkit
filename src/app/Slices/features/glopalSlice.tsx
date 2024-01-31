import { createSlice } from '@reduxjs/toolkit'


export interface Idrawer {
    isOpenCartDrawer:boolean,
    onCloseDrawer:boolean
   }
   
   const initialState: Idrawer = {
       isOpenCartDrawer:false,
    onCloseDrawer:false
   }

   
export const glopalSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        onOpenCartDrawer:(state)=>{
            state.onCloseDrawer = true,
            state.isOpenCartDrawer=  true
        },
        onCloseDrawer: (state)=>{
            state.onCloseDrawer = false,
            state.isOpenCartDrawer = false
        }
      }
     
  
  })
  
  // Action creators are generated for each case reducer function
  export const { onCloseDrawer,onOpenCartDrawer } = glopalSlice.actions
  export default glopalSlice.reducer