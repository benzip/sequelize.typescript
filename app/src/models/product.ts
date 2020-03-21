import ProductCategory from "./product.category";

export default interface Product {
  Id: number;
  ProductName: string;
  SearchName: string;
  Category: number;
  CategoryDTO: ProductCategory;
}
