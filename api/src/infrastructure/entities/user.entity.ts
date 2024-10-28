import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["firstName", "lastName"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 150 })
    firstName: string;

    @Column({ type: "varchar", length: 150 })
    lastName: string;
}
