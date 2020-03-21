import { UserRole } from "./UserRole";
import { Model } from "sequelize-typescript";

export class User extends Model {
  UserId!: String;
  Password!: String;
  UserRole!: String;
  Email!: String;
}
