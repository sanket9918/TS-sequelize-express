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
    timestamps: true,
})
export class Hobby extends Model<Hobby> {
    @Column
    name!: string;

    @ForeignKey(() => User)
    @Column
    UserId?: number;

    @BelongsTo(() => User, { foreignKey: "UserId" })
    user!: User;
}
