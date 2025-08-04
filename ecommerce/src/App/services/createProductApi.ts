import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieManager from "../../utils/cookieManager";
export const createProductApi = createApi({
  reducerPath: "createProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = cookieManager.get<string>("jwtToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (files: {
        thumbnail: File | string;
        images: FileList | File[] | (string | File)[];
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
    uploadProduct: builder.mutation({
     query: (productData) => {

      return {
       url: "/products/?populate=*",
       method: "POST",
       body: productData,
      }
     }
    })
  }),
});
export const { useUploadImageMutation , useUploadProductMutation } = createProductApi;
