import { EncodeAnimalImagesInterceptor } from './encode-animal-images.interceptor';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  DefaultValuePipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AnimalType } from 'src/util/enums/animal.enum';
import { Gender } from 'src/util/enums/gender.enum';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @UseInterceptors(EncodeAnimalImagesInterceptor)
  @Get()
  findAll(
    @Query('shouldBringImages', new DefaultValuePipe(false))
    shouldBringImages: boolean,
  ) {
    return this.animalService.findAll(shouldBringImages);
  }

  findByFilters(
    @Query('gender') gender: Gender,
    @Query('type') animal: AnimalType,
    @Query('breed') breed: string,
  ) {
    var filter = {};
    if (gender) {
      filter['gender'] = gender;
    }
    if (animal) {
      filter['type'] = animal;
    }
    if (breed) {
      filter['breed'] = breed;
    }
    return this.animalService.getAnimalsByFilter(filter);
  }

  @UseInterceptors(EncodeAnimalImagesInterceptor)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('shouldBringImages', new DefaultValuePipe(false))
    shouldBringImages: boolean,
  ) {
    const animal = await this.animalService.findOne(id, shouldBringImages);
    if (!animal) {
      throw new HttpException(
        'There is no animal with the given id',
        HttpStatus.NOT_FOUND,
      );
    }
    return animal;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id);
  }
}
