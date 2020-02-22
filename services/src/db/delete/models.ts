import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table({
  // paranoid: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
  tableName: "product"
})
export class Product extends Model<Product> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  Id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  ProductName!: String;
}

export default [Product];
