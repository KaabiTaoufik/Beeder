import { Module } from '@nestjs/common';
import { DataStorageService } from './data-storage/data-storage.service';

@Module({
  providers: [DataStorageService],
  exports: [DataStorageService],
})
export class SharedModule {}
