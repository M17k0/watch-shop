export interface Watch {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  type: string;
  imageUrl: string;
  productTags: ProductTag[];
}

export interface ProductTag {
  id: number;
  productId: number;
  tagId: number;
  tagName: string;
  categoryId: number;
  categoryName: string;
}

export interface Tag {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
}
