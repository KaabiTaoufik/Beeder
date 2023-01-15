import { Gender } from 'src/util/enums/gender.enum';

export class CreateAnimalDto {
  type: string;
  gender: Gender;
  age: number;
  ownerId: string;
}
