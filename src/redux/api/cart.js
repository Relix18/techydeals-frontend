import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_BACKEND_URL;

export const cart = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/`,
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "cart",
        credentials: "include",
      }),
      providesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
    addCart: builder.mutation({
      query: (data) => ({
        url: "cart",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: `cart/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useAddCartMutation,
} = cart;
