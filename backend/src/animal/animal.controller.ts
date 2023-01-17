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
  ParseBoolPipe,
  UseInterceptors,
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
      @Query('userId', new DefaultValuePipe(null))
      userId,
      @Query('shouldBringImages', new DefaultValuePipe(false))
      shouldBringImages: boolean,
  ) {
    return this.animalService.findAll(userId,shouldBringImages);
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
  findOne(
    @Param('id') id: string,
    @Query('shouldBringImages', new DefaultValuePipe(false))
    shouldBringImages: boolean,
  ) {
    return this.animalService.findOne(id, shouldBringImages);
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
