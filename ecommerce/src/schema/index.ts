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
