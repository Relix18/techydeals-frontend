import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_BACKEND_URL;

export const order = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/`,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: "order/me",
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "order/me",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "admin/orders",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `admin/order/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `admin/order/${data.id}`,
        method: "PUT",
        body: data.data,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `order/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
  useCreateOrderMutation,
  useCancelOrderMutation,
} = order;
