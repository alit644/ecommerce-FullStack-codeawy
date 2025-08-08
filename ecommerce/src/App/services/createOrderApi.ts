import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
import type { IOrder, OrdersResponse } from "../../interfaces";
import qs from "qs";
export const createOrderApi = createApi({
  reducerPath: "createOrderApi",
  tagTypes: ["orders"],
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
        const queryString = qs.stringify(
          {
            populate: {
              // items: {
              //   populate: {
              //     product: {
              //       populate: ["thumbnail"],
              //     },
              //   },
              // },
              items: true,
              user: true,
            },
            pagination: {
              page,
              pageSize,
            },
            sort: valueSort ? ["createdAt:" + valueSort] : undefined,
          },
          { encodeValuesOnly: true }
        );
        const searchQuery = qs.stringify({
          filters: {
            $or: [
              {
                id: {
                  $contains: query,
                },
              },
              {
                statuss: {
                  $contains: query,
                },
              },
            ],
          },
        });
        return {
          url: `/orders?${queryString}&${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "orders" as const,
                id,
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
      ],
    }),
  }),
});
export const {
  useGetDashboardOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = createOrderApi;
