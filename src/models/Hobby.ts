import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "Hobbies",
})
export default class Hobby extends Model {
  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column
  UserId?: number;

  @BelongsTo(() => User)
  user!: User;
}
