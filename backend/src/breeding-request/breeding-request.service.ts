import { Injectable } from '@nestjs/common';
import { UpdateBreedingRequestDto } from './dto/update-breeding-request.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateBreedingRequestDto} from "./dto/create-breeding-request.dto";
import {BreedingRequest} from "./entities/breeding-request.entity";
import {RequestStateEnum} from "../util/enums/requestState.enum";

@Injectable()
export class BreedingRequestService {
  constructor(
      @InjectRepository(BreedingRequest)
      private breedingRequestRepository: Repository<BreedingRequest>) {
  }

  create(createBreedingRequestDto: CreateBreedingRequestDto) {
    const breedingRequest = this.breedingRequestRepository.create(createBreedingRequestDto);
    console.log(createBreedingRequestDto)
    return this.breedingRequestRepository.save(breedingRequest);
  }

  findAll(state: RequestStateEnum) :Promise<BreedingRequest[]>{
    console.log(state)
      return this.breedingRequestRepository.find({
        relations: {
          to: true,
          from: true,
        },
        where :{state}
      });
  }

  findOne(id: number) {
    return `This action returns a #${id} breedingRequest`;
  }

  update(updatedBreedingRequest: BreedingRequest) {
    return this.breedingRequestRepository.save(updatedBreedingRequest);
  }

  remove(id: number) {
    return `This action removes a #${id} breedingRequest`;
  }
}
