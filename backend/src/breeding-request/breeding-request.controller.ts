import {Controller, Get, Post, Body, Patch, Param, Delete, Put, Query} from '@nestjs/common';
import { BreedingRequestService } from './breeding-request.service';
import { CreateBreedingRequestDto } from './dto/create-breeding-request.dto';
import { UpdateBreedingRequestDto } from './dto/update-breeding-request.dto';
import {BreedingRequest} from "./entities/breeding-request.entity";
import {RequestStateEnum} from "../util/enums/requestState.enum";

@Controller('breeding-request')
export class BreedingRequestController {
  constructor(private readonly breedingRequestService: BreedingRequestService) {}

  @Post()
  create(@Body() createBreedingRequestDto: CreateBreedingRequestDto) {
    return this.breedingRequestService.create(createBreedingRequestDto);
  }

  @Get()
  findAll(@Query('state') state: RequestStateEnum) {
    return this.breedingRequestService.findAll(state);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedingRequestService.findOne(+id);
  }

  @Put('')
  update(@Body() updateBreedingRequestDto: BreedingRequest) {
    console.log(updateBreedingRequestDto)
    return this.breedingRequestService.update(updateBreedingRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedingRequestService.remove(+id);
  }
}
