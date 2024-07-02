import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_BACKEND_URL;

export const product = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/product/`,
  }),
  tagTypes: ["Products", "AdminProducts", "Category"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        category,
        keyword = "",
        page = 1,
        newArrival,
        sortBy,
        sortOrder,
      }) =>
        newArrival
          ? `all?newArrival=${newArrival}&page=${page}`
          : category
          ? `all?category=${category}&keyword=${keyword}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`
          : `all?keyword=${keyword}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`,
    }),
    getProduct: builder.query({
      query: (id) => `${id}`,
      providesTags: ["Products"],
    }),
    getProductCategory: builder.query({
      query: () => ({
        url: `category`,
      }),
      providesTags: ["Category"],
    }),
    getNewProducts: builder.query({
      query: () => ({
        url: "category/newarrival",
      }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `review`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    getAdminProducts: builder.query({
      query: () => ({
        url: "admin/products",
        credentials: "include",
      }),
      providesTags: ["AdminProducts"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `admin/${data.id}`,
        method: "PUT",
        body: data.product,
        credentials: "include",
      }),
      invalidatesTags: ["AdminProducts"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["AdminProducts"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "admin/new",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["AdminProducts"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "category/new",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `category/${data}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `review/all?id=${id}`,
        credentials: "include",
      }),
      providesTags: ["Products"],
    }),
    deleteReview: builder.mutation({
      query: (data) => ({
        url: `reviews?productId=${data.productId}&id=${data.selectedReviewId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductCategoryQuery,
  useGetNewProductsQuery,
  useAddReviewMutation,
  useGetAdminProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = product;
