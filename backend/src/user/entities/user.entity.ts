import { Animal } from "./../../animal/entities/animal.entity";
import { Timestamp } from "./../../util/entities/timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../auth/enum/role.enum";

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
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  @OneToMany((type) => Animal, (animal) => animal.owner)
  animals: Animal[];
}
