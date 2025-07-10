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
