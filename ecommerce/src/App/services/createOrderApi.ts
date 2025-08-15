import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
import type { IOrder, OrdersResponse } from "../../interfaces";
import qs from "qs";
export const createOrderApi = createApi({
  reducerPath: "createOrderApi",
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
    getDashboardOrders: builder.query<
      OrdersResponse,
      {
        page: number;
        pageSize: number;
        valueSort?: string;
        query?: string;
      }
    >({
      query: ({ page, pageSize, valueSort, query }) => {
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
           
              items: true,
              user: true,
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
          url: `/orders?${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ documentId }) => ({
                type: "orders" as const,
                id: documentId,
              })),
              { type: "orders", id: "LIST" },
            ]
          : [{ type: "orders", id: "LIST" }],

      keepUnusedDataFor: 300,
    }),
    getOrderById: builder.query<{ data: IOrder }, string>({
      query: (documentId: string) => {
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
              user: true,
            },
          },
          { encodeValuesOnly: true }
        );
        return {
          url: `/orders/${documentId}?${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result) => [
        { type: "orders", id: result?.data?.documentId },
      ],
      keepUnusedDataFor: 300,
    }),
    updateOrderStatus: builder.mutation({
      query: ({
        documentId,
        statuss,
      }: {
        documentId: string;
        statuss: string;
      }) => ({
        url: `/orders/${documentId}`,
        method: "PUT",
        body: {
          data: {
            statuss,
          },
        },
      }),
      invalidatesTags: (result) => [
        { type: "orders", id: result?.data?.documentId },
        { type: "profile", id: result?.data?.documentId },
      ],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `/orders`,
        method: "POST",
        body: {
          data: {
            user: orderData.user,
            items: orderData.items,
            totalPrice: orderData.totalPrice,
            statuss: orderData.statuss,
            address: {
              streetAddress: orderData.address.streetAddress,
              city: orderData.address.city,
              state: orderData.address.state,
              phone: orderData.address.phone,
              email: orderData.address.email,
            },
          },
        },
      }),
      invalidatesTags: (result) => [
        { type: "orders", id: result?.data?.documentId },
        { type: "profile", id: result?.data?.documentId },
      ],
    }),
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
                type: "orders" as const,
                id: documentId,
              })),
              { type: "orders", id: "LIST" },
            ]
          : [{ type: "orders", id: "LIST" }],

      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetDashboardOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
} = createOrderApi;
