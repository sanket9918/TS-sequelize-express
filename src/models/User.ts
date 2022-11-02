import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: "Users",
})
export class User extends Model<User> {
    @Column({
    	type: DataType.STRING,
    })
    	name!: string;

    @Column({
    	type: DataType.INTEGER,
    })
    	age!: number;
}
