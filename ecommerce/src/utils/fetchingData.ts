import qs from "qs";
import api from "../Api/axios";

export const fetchProducts = async (
  page: number,
  pageSize: number,
  filters: string,
  value?: string,
  query?: string
) => {
  try {
    const queryString = qs.stringify(
      {
        populate: ["thumbnail", "category"],
        pagination: {
          page,
          pageSize,
        },
        sort: ["title:" + value],
      },
      { encodeValuesOnly: true }
    );

    const { data } = await api.get(`api/products?${queryString}&${filters}&filters[$or][0][title][$contains]=${query}&filters[$or][1][category][title][$contains]=${query}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategory = async (page: number, pageSize: number) => {
  try {
    const queryString = qs.stringify(
      {
        populate: ["thumbnail"],
        pagination: {
          page,
          pageSize,
        },
      },
      { encodeValuesOnly: true }
    );
    const { data } = await api.get(`api/categories?${queryString}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsByTag = async (tag: string) => {
  try {
    const queryString = qs.stringify(
      {
        populate: ["thumbnail"],
        pagination: {
          limit: 5,
        },
        filters: {
          tags: {
            tag: {
              $eq: tag,
            },
          },
        },
        fields: ["description", "title", "price", "brand", "discount"],
      },
      { encodeValuesOnly: true }
    );
    const { data } = await api.get(`api/products?${queryString}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDiscounts = async () => {
 const queryString = qs.stringify(
   {
     populate: ["thumbnail"],
     pagination: {
       limit: 5,
     },
     filters: {
       discount: {
         $gt: 0,
       },
     },
     fields: ["description", "title", "price", "brand", "discount"],
   },
   { encodeValuesOnly: true }
 );
  try {
    const { data } = await api.get(`api/products?${queryString}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct = async (documentId: string | undefined) => {
  try {
    const { data } = await api.get(`/api/products/${documentId}?populate=*`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsByCategory = async (
  categoryTitle: string,
  documentId: string | undefined
) => {
  try {
    const queryString = qs.stringify(
      {
        populate: "*",
        pagination: {
          limit: 5,
        },
        filters: {
          category: {
            title: {
              $eq: categoryTitle,
            },
          },
          documentId: {
            $ne: documentId,
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const { data } = await api.get(`/api/products?${queryString}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
