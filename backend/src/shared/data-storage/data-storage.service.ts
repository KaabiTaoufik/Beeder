import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { StorageEngine, diskStorage } from 'multer';

@Injectable()
export class DataStorageService {
  constructor(private configService: ConfigService) {}

  private readFileAsync(
    path: string,
    options?: { encoding?: null; flag?: string },
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const file = readFileSync(path, options);
        resolve(file);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getImageAsBase64(imageId: string, type: string): Promise<string> {
    const path = `${this.configService.get(
      'storageDirectory',
    )}/images/${imageId}.${type}`;
    const image = await this.readFileAsync(path);
    return image.toString('base64');
  }
}
