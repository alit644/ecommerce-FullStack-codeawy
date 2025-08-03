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
    category: yup.array().of(yup.string().required()).required(),
    tags: yup.array().of(yup.string().required()).required().min(2).max(15),
    brand: yup.array().of(yup.string().required()).required(),
    thumbnail: yup
      .mixed<FileList | File[] | (File | string)[]>()
      .test("required", "Image is required", (value) => Array.isArray(value) && value.length > 0)
      .required(),
    images: yup
      .mixed<FileList | File[] | (File | string)[]>()
      .test("required", "Images are required", (value) => Array.isArray(value) && value.length > 0)
      .required(),
  })
  .required();
