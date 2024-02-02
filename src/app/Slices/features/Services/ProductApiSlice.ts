import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const ProductApiSlice = createApi({
    reducerPath:"products",
    tagTypes:["Products"],
    refetchOnReconnect:true,
    refetchOnMountOrArgChange:true,
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:1337/api"}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>{
                return {
                    url:"/products?populate=thumbnail,catagory,createdAt"
                }
            }
        })
    })
})

export const {useGetProductsQuery}=ProductApiSlice;