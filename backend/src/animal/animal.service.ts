import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/util/enums/gender.enum';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>
  ){}
  create(createAnimalDto: CreateAnimalDto) {
    var animal = new Animal();
    animal.owner = createAnimalDto["owner"];
    animal.ownerId = CreateAnimalDto["ownerId"];
    animal.type = CreateAnimalDto["type"];
    animal.gender = CreateAnimalDto["gender"];
    animal.images = CreateAnimalDto["images"];
    this.animalRepository.save(animal);
    return createAnimalDto;
  }

  findAll() {
    return this.animalRepository.find();
    return `This action returns all animal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }

  getAnimalsByFilter(filter){
    return this.animalRepository.findAndCount(filter as FindManyOptions<Animal>);
  }
}
