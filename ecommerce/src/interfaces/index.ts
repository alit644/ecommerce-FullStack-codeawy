import type { IconType } from "react-icons/lib";

export interface IProductCard {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  brand?: string;
  stock?: number;
  discount?: number;
  images?: {
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
    url?: string;
    alternativeText?: string;
    caption?: string;
    formats: {
      small: {
        url: string;
      };
    };
  };
  category?: {
    title: string;
  };
  quantity: number;
  rating?: number;
}

export interface ICategory {
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
}
export interface AuthData {
  jwt: string;
  user: IUserInfo;
}

export interface ICartProduct {
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

export interface IDashboardOverview {
  name: string;
  description: string;
  percentage: string;
  count: number;
  icon: IconType;
  color: string;
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
  category: string[];
  tags: string[];
  brand: string[];
  thumbnail: FileList | File[] | (File | string)[];
  images: FileList | File[] | (File | string)[];
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


// try {
    //   const uploadResponse = await uploadImage(data.thumbnail).unwrap();
    //   const uploadedImageId = uploadResponse[0].id; // Assuming the API returns an array of uploaded files
    //   console.log(uploadedImageId)
    // } catch (error) {
    //   console.log(error)
      
    // }
    // try {
    //   const formData = new FormData();
    //   formData.append("files", data.thumbnail[0]); // رفع أول صورة فقط
    
    //   const uploadRes = await api.post("/api/upload", formData, {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   const uploadedImage = uploadRes.data[0].id; // الصورة المرفوعة (نأخذ الـ ID)
    //   console.log(uploadedImage)
    
    //   console.log("Image Uploaded:", uploadedImage);
    // } catch (error) {
    //   console.error("Error adding product:", error);
    // }