import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
import type { FilterType } from "../../interfaces";
import qs from "qs";
export const createCategoryApi = createApi({
  reducerPath: "createCategoryApi",
  tagTypes: ["categories"],
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
    getDashboardCategories: builder.query<
      any,
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
            populate: ["thumbnail"],
            pagination: {
              page,
              pageSize,
            },
            sort: valueSort ? ["title:" + valueSort] : undefined,
          },
          { encodeValuesOnly: true }
        );
        const searchQuery = qs.stringify({
          filters: {
            $or: [
              {
                title: {
                  $contains: query,
                },
              },
            ],
          },
        });
        return {
          url: `/categories/?${queryString}&${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "categories" as const,
                id,
              })),
              { type: "categories", id: "LIST" },
            ]
          : [{ type: "categories", id: "LIST" }],

      keepUnusedDataFor: 300,
    }),
    uploadImage: builder.mutation({
      query: (files: {
        thumbnail: File | string;
      }) => {
        const formData = new FormData();
        formData.append("files", files.thumbnail);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
    deleteImage: builder.mutation({
      query: (documentId: string) => {
        return {
          url: `/upload/files/${documentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),
    uploadCategory: builder.mutation({
      query: (categoryData) => {
        return {
          url: "/categories/?populate=*",
          method: "POST",
          body: categoryData,
        };
      },
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({
        categoryData,
        documentId,
      }: {
        categoryData: any;
        documentId: string;
      }) => {
        return {
          url: `/categories/${documentId}`,
          method: "PUT",
          body: categoryData,
        };
      },
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (documentId) => {
        return {
          url: `/categories/${documentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),
  }),
});
export const {
  useUploadImageMutation,
  useUploadCategoryMutation,
  useDeleteCategoryMutation,
  useGetDashboardCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteImageMutation,
} = createCategoryApi;
