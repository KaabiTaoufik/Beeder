import { AnimalService } from './animal.service';
import { Animal } from './entities/animal.entity';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class EncodeAnimalImagesInterceptor implements NestInterceptor {
  constructor(private animalService: AnimalService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const shouldEncodeImages: boolean =
      request.query['shouldEncodeImages'] === 'true';
    if (!shouldEncodeImages) {
      return next.handle();
    }
    return next.handle().pipe(
      map(async (res) => {
        if (Array.isArray(res) && res.every((el) => el instanceof Animal)) {
          for (const animal of res) {
            await this.animalService.convertImagesToBase64(animal);
          }
        } else if (res instanceof Animal) {
          await this.animalService.convertImagesToBase64(res);
        }
        return res;
      }),
    );
  }
}
