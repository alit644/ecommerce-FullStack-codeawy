import type {
  ILoginInput,
  IRegisterInput,
} from "../interfaces";

export const tabs = [
  { label: "Featured Products", value: "featured" },
  { label: "Bestseller", value: "bestseller" },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    id: "identifier",
    name: "identifier",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    validation: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    validation: {
      required: true,
      minLength: 6,
      maxLength: 20,
    },
  },
];

export const REGISTER_FORM: IRegisterInput[] = [
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "Username",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 15,
    },
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    validation: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    validation: {
      required: true,
      minLength: 6,
      maxLength: 20,
    },
  },
];

export const brands = [
  { name: "Apple", count: 110 },
  { name: "Samsung", count: 125 },
  { name: "Xiaomi", count: 68 },
  { name: "Poco", count: 44 },
  { name: "OPPO", count: 38 },
  { name: "Honor", count: 10 },
  { name: "Motorola", count: 34 },
  { name: "Nokia", count: 22 },
  { name: "Realme", count: 35 },
];

export const price = [
  { name: "Under $100", count: 110 },
  { name: "$100 - $500", count: 125 },
  { name: "$500 - $1000", count: 68 },
  { name: "$1000 - $2000", count: 44 },
  { name: "$2000 - $5000", count: 38 },
  { name: "$5000 - $10000", count: 10 },
];


