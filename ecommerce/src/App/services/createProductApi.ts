import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
import type { FilterType, ProductsResponse } from "../../interfaces";
import qs from "qs";
import { generateStrapiQuery } from "../../utils/generateStrapiQuery";
export const createProductApi = createApi({
  reducerPath: "createProductApi",
  //! tagTypes: ["products"] تستخدم لاستدعاء البيانات مرة أخرى عند تحديث البيانات
  tagTypes: ["products"],
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
    getDashboardProducts: builder.query<
      ProductsResponse,
      {
        page: number;
        pageSize: number;
        filters?: FilterType;
        valueSort?: string;
        query?: string;
      }
    >({
      query: ({ page, pageSize, filters, valueSort, query }) => {
        const queryString = qs.stringify(
          {
            populate: ["thumbnail", "category"],
            pagination: {
              page,
              pageSize,
            },
            sort: valueSort ? ["title:" + valueSort] : undefined,
          },
          { encodeValuesOnly: true }
        );
        const filtersQuery = generateStrapiQuery(filters ?? {});
        const searchQuery = qs.stringify({
          filters: {
            $or: [
              {
                title: {
                  $contains: query,
                },
              },
              {
                category: {
                  title: {
                    $contains: query,
                  },
                },
              },
            ],
          },
        });
        return {
          url: `/products?${queryString}&${filtersQuery}&${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "products" as const,
                id,
              })),
              { type: "products", id: "LIST" },
            ]
          : [{ type: "products", id: "LIST" }],

      keepUnusedDataFor: 300,
    }),
    uploadImage: builder.mutation({
      query: (files: {
        thumbnail: File | string;
        images: FileList | File[] | (string | File)[] | string;
      }) => {
        const formData = new FormData();
        formData.append("files", files.thumbnail);
        Array.from(files.images).forEach((image) => {
          formData.append("files", image);
        });
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
    deleteImage: builder.mutation({
      query: (documentId: (string | number | undefined)[]) => {
        return {
          url: `/upload/files/${documentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
    uploadProduct: builder.mutation({
      query: (productData) => {
        return {
          url: "/products/?populate=*",
          method: "POST",
          body: productData,
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({
        productData,
        documentId,
      }: {
        productData: any;
        documentId: string;
      }) => {
        return {
          url: `/products/${documentId}`,
          method: "PUT",
          body: productData,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (documentId) => {
        return {
          url: `/products/${documentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});
export const {
  useUploadImageMutation,
  useUploadProductMutation,
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
  useUpdateProductMutation,
  useDeleteImageMutation,
} = createProductApi;
