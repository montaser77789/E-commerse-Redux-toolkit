import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesServices from "../../../../Services/CookiesServices";
interface IProductId {
  id: number;
}
export const ProductApiSlice = createApi({
  reducerPath: "products",
  tagTypes: ["products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        return {
          url: "/products?populate=thumbnail,catagory,createdAt",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: IProductId) => ({
                type: "products" as const,
                id,
              })),
              { type: "products", id: "LIST" },
            ]
          : [{ type: "products", id: "LIST" }],
    }),
    deleteDashboardProducts: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookiesServices.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),
    updateDashboardProducts: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookiesServices.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ProductApiSlice.util.updateQueryData("getProducts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
} = ProductApiSlice;
