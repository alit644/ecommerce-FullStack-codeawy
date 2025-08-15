import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
import type { OrdersResponse } from "../../interfaces";
import qs from "qs";
export const createProfileApi = createApi({
  reducerPath: "createProfileApi",
  tagTypes: ["orders", "profile"],
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
    getUserOrders: builder.query<
      OrdersResponse,
      {
        page: number;
        pageSize: number;
        valueSort?: string;
        query?: string;
        userID: number;
      }
    >({
      query: ({ page, pageSize, valueSort, query, userID }) => {
       const filters: { $or: Array<Record<string, unknown>> } = { $or: [] };

       if (query && query.trim()) {
         // إذا القيمة رقم → بحث بالـ id
         if (!isNaN(Number(query))) {
           filters.$or.push({ id: { $eq: Number(query) } });
         } else {
           // إذا نص → بحث جزئي على الحالة
           filters.$or.push({ statuss: { $containsi: query } });
         }
       }
        const queryString = qs.stringify(
          {
            populate: {
              items: {
                populate: {
                  product: {
                    populate: ["thumbnail"],
                  },
                },
              },
            },
            pagination: {
              page,
              pageSize,
            },
            sort: valueSort ? ["createdAt:" + valueSort] : undefined,
            ...(filters.$or.length > 0 ? { filters } : {}),
          },
          { encodeValuesOnly: true }
        );

       
        return {
          url: `/orders?${queryString}&filters[user][id][$eq]=${userID}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ documentId }) => ({
                type: "profile" as const,
                id: documentId,
              })),
              { type: "profile", id: "LIST" },
            ]
          : [{ type: "profile", id: "LIST" }],

      keepUnusedDataFor: 300,
    }),
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
  useGetUserOrdersQuery,
  useChangeUserPasswordMutation,
} = createProfileApi;
