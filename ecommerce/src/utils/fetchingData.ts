import api from "../Api/axios";

export const fetchProducts = async (
  page: number,
  pageSize: number,
  filters: string
) => {
  try {
    const { data } = await api.get(
      `api/products?populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=${pageSize}&${filters}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategory = async (page: number, pageSize: number) => {
  try {
    const { data } = await api.get(
      `api/categories?populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsByTag = async (tag: string) => {
  try {
    const { data } = await api.get(
      `api/products?populate=thumbnail&filters[tags][tag][$eq]=${tag}&pagination[limit]=5&fields=description,title,price,brand,discount`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDiscounts = async () => {
  try {
    const { data } = await api.get(
      `api/products?populate=thumbnail&filters[discount][$gt]=0&pagination[limit]=5&fields=description,title,price,brand,discount`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
