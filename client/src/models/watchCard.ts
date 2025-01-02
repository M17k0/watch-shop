export interface Watch {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  type: string;
  imageUrl: string;
  productTags: ProductTag[]
}

export interface ProductTag {
  id: number;
  productId: number;
  tagId: number;
  tagName: string;
  categoryId: number;
  categoryName: string;
}

// export interface Tag {
//   ID: number;
//   Name: string;
//   CategoryID: number;
// }

// export interface Category {
//   ID: number;
//   Name: string;
//   Tags?: Tag[];
// }
