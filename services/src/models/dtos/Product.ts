import { Model } from "sequelize-typescript";

export class Product extends Model {
  Id!: number;
  ProductName!: String;
  SearchName!: String;
  Category!: String;
}
