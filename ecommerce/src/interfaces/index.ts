export interface IProductCard {
  id: number;
  title: string;
  description: string;
  price: number;
  brand?: string;
  stock?: number;
  thumbnail: {
    url: string;
    alternativeText?: string;
    caption?: string;
  };
}

export interface ICategory {
  title: string;
  thumbnail: {
    formats: {
      small: {
        url: string;
      };
    };
  };
}

export interface ILoginInput {
  id: string;
  name: "identifier" | "password"
  type: string;
  placeholder: string;
  label: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export interface IRegisterInput {
  id: string;
  name: "username" | "email" | "password"
  type: string;
  placeholder: string;
  label: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export interface IError {
  error: {
    message?: string;
  };
}