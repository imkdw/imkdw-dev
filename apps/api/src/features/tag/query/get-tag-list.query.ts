import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { TagDto } from '@/features/tag/dto/get-tag-list.dto';

@Injectable()
export class GetTagListQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<TagDto[]> {
    const tags = await this.prisma.tag.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    return tags.map(
      (tag): TagDto => ({
        id: tag.id,
        name: tag.name,
      })
    );
  }
}
