import { Model } from "sequelize-typescript";

export class UserRole extends Model {
  Id!: Number;
  RoleName!: String;
}
