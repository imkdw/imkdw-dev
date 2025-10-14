import { S3StorageService } from '@/infra/storage/s3-storage.service';
import { StorageController } from '@/infra/storage/storage.controller';
import { STORAGE_SERVICE } from '@/infra/storage/storage.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [StorageController],
  providers: [
    {
      provide: STORAGE_SERVICE,
      useClass: S3StorageService,
    },
  ],
  exports: [STORAGE_SERVICE],
})
export class StorageModule {}
