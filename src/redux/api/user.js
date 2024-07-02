import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_BACKEND_URL;

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/`,
  }),
  tagTypes: ["User", "Address"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    verifyUser: builder.query({
      query: (data) => ({
        url: `users/${data.id}/verify/${data.token}`,
        credentials: "include",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "me",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "password/forgot",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `password/reset/${data.token}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "profile/update",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "password/update",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    getUserAddress: builder.query({
      query: () => ({
        url: "address",
        credentials: "include",
      }),
      providesTags: ["Address"],
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: "address",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `address/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: (data) => ({
        url: `address/${data.id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "admin/users",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `admin/user/${id}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `admin/user/${data.id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useVerifyUserQuery,
  useGetUserQuery,
  useGetUserAddressQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAddAddressMutation,
  useLogoutUserMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = user;
