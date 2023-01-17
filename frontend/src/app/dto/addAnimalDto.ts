import { Animal } from "../models/animal";

export class addAnimalDto {
  animal: Partial<Animal> = {};
  files: File[] = [];
  userId: string | null = '';
  constructor(animal: Partial<Animal>, files: File[], userId: string | null) {
    this.animal = animal;
    this.files = files;
    this.userId = userId;
  }
}
