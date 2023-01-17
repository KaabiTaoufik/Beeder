import { User } from './user';
import { AnimalImage } from './animal-image';
import { Gender } from './../Enums/genderEnum';
export class Animal {
  id: string ="";
  ownerId: string | null = null;
  type: string | null = null;
  gender: Gender | null = null;
  age: number = 0;
  images: (AnimalImage | string)[] = [];
  owner?: User | null = null;
}
