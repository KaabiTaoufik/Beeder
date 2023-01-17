import { AnimalImage } from './entities/animal-image.entity';
import { DataStorageService } from './../shared/data-storage/data-storage.service';
import { Animal } from './entities/animal.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/util/enums/gender.enum';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
    private storageService: DataStorageService,
  ) {}

  async convertImagesToBase64(animal: Animal): Promise<void> {
    if (!animal.images) {
      return;
    }
    const convertedImages: string[] = [];
    for (const image of animal.images) {
      if (image instanceof AnimalImage) {
        const dataAsBase64 = await this.storageService.getImageAsBase64(
          image.id,
          image.type,
        );
        convertedImages.push(`data:image/${image.type};base64,${dataAsBase64}`);
      } else if (typeof image === 'string') {
        convertedImages.push(image);
      }
    }
    animal.images = convertedImages;
  }

  create(createAnimalDto: CreateAnimalDto) {
    const animal = this.animalRepository.create(createAnimalDto);
    animal.images = [];
    return this.animalRepository.save(animal);
  }

  async findAll(shouldBringImages: boolean): Promise<Animal[]> {
    if (!shouldBringImages) {
      return this.animalRepository.find();
    }
    const animals = await this.animalRepository.find({
      relations: {
        images: true,
      },
    });
    return animals;
  }

  async findOne(id: string, shouldBringImages: boolean): Promise<Animal> {
    const options: FindOneOptions<Animal> = {
      where: { id },
      relations: {
        owner: true,
      },
    };
    if (shouldBringImages) {
      options.relations = { ...options.relations, images: true };
    }
    const animal = await this.animalRepository.findOne(options);
    if (animal?.owner) {
      delete animal.owner.password;
    }
    return animal;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }

  getAnimalsByFilter(filter) {
    return this.animalRepository.findAndCount(
      filter as FindManyOptions<Animal>,
    );
  }
}
