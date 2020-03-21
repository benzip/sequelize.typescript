import { Model } from "sequelize-typescript";

export class ProductCategory extends Model {
  Id!: String;
  Name!: String;
}
