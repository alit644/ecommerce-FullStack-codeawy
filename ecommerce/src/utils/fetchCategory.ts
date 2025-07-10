import api from "../Api/axios";

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
