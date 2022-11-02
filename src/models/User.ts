import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Hobby from "./Hobby";

@Table({
  timestamps: true,
  tableName: "Users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
  })
  age!: number;

  @HasMany(() => Hobby)
  hobby!: Hobby[];
}
