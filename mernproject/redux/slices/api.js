import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      let token = getState().configUser.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Order"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/register", method: "POST", body }),
    }),
    logout: builder.query({
      query: () => "/logout",
    }),
    getMyInfo: builder.query({
      query: () => "/me",
      providesTags: ["User"],
    }),
    getProductByPage: builder.query({
      query: (page) => `/product?page=${page}`,
      providesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/product/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (body) => ({ url: `product/new`, method: "POST", body }),
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: `/me/address`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/me/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getMyOrders: builder.query({
      query: () => "/me/order",
      providesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => "/admin/orders",
      providesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `/admin/order/update/${id}`,
        method: "PUT",
        body: orderStatus,
      }),
      invalidatesTags: ["Order"],
    }),
    getUserSingleOrder: builder.query({
      query: (id) => `/admin/order/${id}`,
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({ url: `/admin/order/remove/${id}`, method: "DELETE" }),
      invalidatesTags: ["Order"],
    }),
    addOrder: builder.mutation({
      query: (body) => ({ url: "/order/new", method: "POST", body }),
      invalidatesTags: ["Order"],
    }),
    checkKhaltiPayment: builder.mutation({
      query: (body) => ({ url: "/khalti-lookup", method: "POST", body }),
    }),
    makePayment: builder.mutation({
      query: (body) => ({ url: "/khalti-pay", method: "POST", body }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useLazyGetMyInfoQuery,
  useGetMyInfoQuery,
  useGetProductByPageQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetUserSingleOrderQuery,
  useUpdateOrderMutation,
  useAddOrderMutation,
  useCheckKhaltiPaymentMutation,
  useMakePaymentMutation,
  useDeleteOrderMutation,
} = api;
