import api from "../Api/axios";

export const fetchProductsByTag = async (tag: string) => {
  try {
    const { data } = await api.get(
      `api/products?populate=thumbnail&filters[tags][tag][$eq]=${tag}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
