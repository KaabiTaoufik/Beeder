import { Animal } from './animal.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animal_images')
export class AnimalImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Animal, (animal) => animal.images)
  animal: Animal;

  @Column()
  type: string;
}
