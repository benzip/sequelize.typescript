import { Model, BelongsTo } from "sequelize-typescript";
import { User } from "#root/models/dtos/User";

export class UserRole extends Model {
  Id!: String;
  RoleName!: String;

  // @BelongsTo(() => User)
  // User!: User;
}
