import { Animal } from "./../../animal/entities/animal.entity";
import { Timestamp } from "./../../util/entities/timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;
  @Column({
    select: false,
  })
  salt: string;
  @OneToMany((type) => Animal, (animal) => animal.owner)
  animals: Animal[];
}
