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
  UploadedFiles,
  UseGuards,
  Req, Res
} from "@nestjs/common";
import { Gender } from 'src/util/enums/gender.enum';
import { AnimalService } from './animal.service';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import configuration from 'src/config/configuration';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Animal } from './entities/animal.entity';
import { GetUser } from "../user/decorators/user.decorator";
import { User } from "../user/entities/user.entity";
import { isDefined } from 'class-validator';
let path = require('path');

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @UseInterceptors(
    FilesInterceptor('fileToUpload[]', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, configuration().storageDirectory + '/images');
        },
        filename: function (req, file, cb) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          console.log(
            '+++new file uploaded -- FileName:' +
              process.env.STORAGE_DIRECTORY +
              '/images/' +
              randomName +
              path.extname(file.originalname),
          );
          cb(null, randomName + path.extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
    @Body() body: any,
  ) {
    body.ownerId = req.user.id;
    let file_list: Array<{ id: string; type: string }> = [];
    files.forEach((file) => {
      const id: string = file.filename.split('.')[0];
      const type: string = file.filename.split('.')[1];
      file_list.push({ id: id, type: type });
    });

    const animalPromise: Promise<Animal> =
      this.animalService.createAnimalAndImages(body, file_list);
    return animalPromise;
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

  @UseInterceptors(EncodeAnimalImagesInterceptor)
  @Get('filter')
  findByFilters(
    @Req() req,
    @Query('gender') gender: string,
    @Query('type') animal: string,
    @Query('breed') breed: any,
    @Query('shouldBringImages', new DefaultValuePipe(false)) shouldBringImages: boolean,
  ) {
    const filter: any = {};
    if (isDefined(gender)) {
      filter.gender = gender;
    }
    if (isDefined(animal)) {
      filter.type = animal;
    }
    if (isDefined(breed)) {
      filter.breed = breed;
    }
    return this.animalService.getAnimalsByFilter(filter, shouldBringImages);
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
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(EncodeAnimalImagesInterceptor)
  @Get('my/animals')
  async getAnimalsByUser(@GetUser() user: User) {
    return await this.animalService.getAnimalsByUser(user.id);
  }
}
