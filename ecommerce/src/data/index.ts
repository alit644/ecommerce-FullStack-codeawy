import type { ILoginInput } from "../interfaces";

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
