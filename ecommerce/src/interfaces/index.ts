import type { IconType } from "react-icons/lib";

export interface IProductCard {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  price: number;
  brand?: string;
  stock?: number;
  discount?: number;
  images?: {
    id?: string;
    url?: string;
    formats?: {
      small?: {
        url?: string;
      };
    };
  }[];
  product_option?: {
    color?: string;
    storage?: string;
    size?: string;
  };
  thumbnail?: {
    id?: string;
    url?: string;
    alternativeText?: string;
    caption?: string;
    formats: {
      small: {
        url: string;
      };
    };
  };
  category?: ICategory;
  tags?: ITag[];
  quantity: number;
  rating?: number;
}

export type TStatuss =
  | "cancelled"
  | "completed"
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered";

export interface IOrder {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt?: string;
  totalPrice: number;
  statuss: TStatuss;
  items: {
    id: number;
    quantity: number;
    product: IProductCard;
  }[];
  user: IUserInfo;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    discount?: number;
  };
}

export interface ICategory {
  documentId?: string;
  id?: string;
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
  documentId?: string;
  id?: string;
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
  address?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    phone?: string;
    email?: string;
  };
}
export interface AuthData {
  jwt: string;
  user: IUserInfo;
}

export interface ICartProduct {
  userId?: number;
  id: number;
  title: string;
  description: string;
  documentId: string;
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
  each: CheckboxOption[];
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

export interface IDashboardLink {
  name: string;
  href: string;
  icon: IconType;
}

export interface ITableColumn {
  label: string;
  key: string;
  type: "image" | "text" | "actions";
}

export interface IFormInput {
  title: string;
  rating: number;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  tags: string[];
  brand: string;
  // thumbnail: File | string ;
  thumbnail: FileList | File[] | (File | string)[] | string;
  images: FileList | File[] | (File | string)[] | string;
}

export interface IFormInputCategory {
  title: string;
  thumbnail: FileList | File[] | (File | string)[] | string;
}

export interface IPricingSectionInputsData {
  id: string;
  name: "price" | "discount" | "stock" | "title" | "rating";
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder: string;
  label: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface ProductsResponse {
  data: IProductCard[];
  meta: {
    pagination: {
      total: number;
      pageCount: number;
    };
  };
}

export interface OrdersResponse {
  data: IOrder[];
  meta: {
    pagination: {
      total: number;
      pageCount: number;
    };
  };
}

export interface ICheckoutInput {
  id: string;
  name: "city" | "state" | "phone" | "email";
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder: string;
  label: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface IChangePasswordInput {
  id: string;
  name: "currentPassword" | "password" | "passwordConfirmation";
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder: string;
  label: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}
