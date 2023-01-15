import { AnimalImage } from './entities/animal-image.entity';
import { SharedModule } from './../shared/shared.module';
import { Animal } from './entities/animal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, AnimalImage]), SharedModule],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
