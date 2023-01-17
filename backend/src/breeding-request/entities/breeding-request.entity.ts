import { Animal } from '../../animal/entities/animal.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { RequestStateEnum } from '../../util/enums/requestState.enum';
import {User} from "../../user/entities/user.entity";

@Entity('breeding_requests')
export class BreedingRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.requestsFrom)
  from: User;

  @ManyToOne(() => Animal, (animal) => animal.requestsTo)
  to: Animal;

  @Column({
    type: 'enum',
    enum: RequestStateEnum,
  })
  state: RequestStateEnum;
}
