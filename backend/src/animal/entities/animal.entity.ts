import { AnimalImage } from './animal-image.entity';
import { Timestamp } from './../../util/entities/timestamp.entity';
import { Gender } from './../../util/enums/gender.enum';
import { User } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BreedingRequest} from "../../breeding-request/entities/breeding-request.entity";

@Entity('animals')
export class Animal extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.animals)
  owner: User;

  @Column('uuid')
  ownerId: string;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column('int')
  age: number;

  @OneToMany(() => AnimalImage, (image) => image.animal)
  images: AnimalImage[] | string[];


  @OneToMany(() => BreedingRequest, (request) => request.to)
  requestsTo: BreedingRequest[];
}
