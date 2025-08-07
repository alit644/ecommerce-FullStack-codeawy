import * as yup from "yup";

export const schemaLogin = yup
  .object({
    identifier: yup.string().required().email(),
    password: yup.string().required().min(6).max(20),
  })
  .required();

export const schemaRegister = yup
  .object({
    username: yup.string().required().min(2).max(15),
    email: yup.string().required().email(),
    password: yup.string().required().min(6).max(20),
  })
  .required();

export const schemaAddProduct = yup
  .object({
    title: yup.string().required().min(2).max(30),
    rating: yup.number().required().min(1).max(5),
    description: yup.string().required().min(3).max(300),
    price: yup.number().required().min(1).max(1000000),
    discount: yup.number().required().min(0).max(100),
    stock: yup.number().required().min(1).max(300),
    category: yup.string().required(),
    tags: yup.array().of(yup.string().required()).required().min(2).max(15),
    brand: yup.string().required(),
    thumbnail: yup
      .mixed<FileList | File[] | (File | string)[] | string>()
      .test("thumbnail-required", "Thumbnail is required", (value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        if (!value) return false;
        if (typeof value === "string" && value.trim() !== "") return true;
        if (value instanceof File) return true;
        return false;
      })
      .required(),
    images: yup
      .mixed<FileList | File[] | (File | string)[] | string>()
      .test(
        "images-required",
        "Images are required",
        (value) => Array.isArray(value) && value.length > 0
      )
      .required(),
  })
  .required();

export const schemaAddCategory = yup
  .object({
    title: yup.string().required().min(2).max(30),
    thumbnail: yup
      .mixed<FileList | File[] | (File | string)[] | string>()
      .test("thumbnail-required", "Thumbnail is required", (value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        if (!value) return false;
        if (typeof value === "string" && value.trim() !== "") return true;
        if (value instanceof File) return true;
        return false;
      })
      .required(),
  })
  .required();
