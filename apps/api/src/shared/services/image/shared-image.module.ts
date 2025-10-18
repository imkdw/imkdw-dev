import { StorageModule } from '@/infra/storage/storage.module';
import { CopyImageService } from '@/shared/services/image/copy-image.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [StorageModule],
  providers: [CopyImageService],
  exports: [CopyImageService],
})
export class SharedImageModule {}
