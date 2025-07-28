export interface IProductCard {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  brand?: string;
  stock?: number;
  discount?: number;
  thumbnail: {
    url?: string;
    alternativeText?: string;
    caption?: string;
    formats: {
      small: {
        url: string;
      };
    };
  };
  quantity: number;
}

export interface ICategory {
  title: string;
  thumbnail?: {
    formats?: {
      small?: {
        url?: string;
      };
    };
  };
}

export interface ITag {
  tag: string;
}

export interface IPrice {
  name: string;
  count?: number;
}

export interface ILoginInput {
  id: string;
  name: "identifier" | "password";
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
  name: "username" | "email" | "password";
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

export interface IUserInfo {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
}
export interface AuthData {
  jwt: string;
  user: IUserInfo;
}

export interface ICartProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  brand?: string;
  stock?: number;
  thumbnail: {
    url?: string;
    alternativeText?: string;
    caption?: string;
    formats: {
      small: {
        url: string;
      };
    };
  };
  quantity: number;
}
export interface CheckboxOption {
 name?: string;
 tag?: string;
 title?: string;
} 

export interface IAccordionItems {
  value: string;
  key: string;
  label: string;
  each: CheckboxOption[] ;
}



export interface IBrand {
  id?: number;
  name: string;
  logo?: {
    url?: string;
    formats?: {
      small?: {
        url?: string;
      };
    };
  };
}

export interface FilterType {
  brand?: string[];
  category?: string[];
  tags?: string[];
  price?: string[];
  discount?: string[];
}

export interface StrapiFilters {
  brand?: { $in: string[] };
  category?: { title: { $in: string[] } };
  tags?: { tag: { $in: string[] } };
  price?: { $in: string[] };
  discount?: { $in: string[] };
}
