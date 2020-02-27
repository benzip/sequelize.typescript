import { UserRole } from "#root/models/dtos/UserRole";

export class UserQueryViewModel {
  UserId!: String;
  Password!: String;
  Email!: String;
  Role!: UserRole;
}
