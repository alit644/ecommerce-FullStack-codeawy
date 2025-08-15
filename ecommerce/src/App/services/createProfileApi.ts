import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
export const createProfileApi = createApi({
  reducerPath: "createProfileApi",
  tagTypes: ["profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = cookieManager.get<string>("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (addressData: { id: number; address: any }) => ({
        url: `/users/${addressData.id}`,
        method: "PUT",
        body: {
          address: {
            streetAddress: addressData.address.streetAddress,
            city: addressData.address.city,
            state: addressData.address.state,
            phone: addressData.address.phone,
            email: addressData.address.email,
          },
        },
      }),
      invalidatesTags: (result) => [
        { type: "profile", id: result?.data?.documentId },
      ],
    }),
    getUserAddress: builder.query({
      query: (userId: number) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: (result) => [
        { type: "profile", id: result?.data?.documentId },
      ],
    }),
    changeUserPassword: builder.mutation({
      query: (passwordData: {
        currentPassword: string;
        password: string;
        passwordConfirmation: string;
      }) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: {
          currentPassword: passwordData.currentPassword,
          password: passwordData.password,
          passwordConfirmation: passwordData.passwordConfirmation,
        },
      }),
      invalidatesTags: (result) => [
        { type: "profile", id: result?.data?.documentId },
      ],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetUserAddressQuery,
  useChangeUserPasswordMutation,
} = createProfileApi;
