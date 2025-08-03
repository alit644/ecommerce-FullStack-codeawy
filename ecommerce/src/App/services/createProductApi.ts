import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creteProductApi = createApi({
  reducerPath: "creteProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    credentials: "include",
    
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("files", file);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});
export const { useUploadImageMutation } = creteProductApi;
