import { Model } from "sequelize-typescript";

export class Product extends Model {
  Id!: string;
  ProductName!: String;
  SearchName!: String;
}
