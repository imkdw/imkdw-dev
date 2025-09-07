import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/infra/database/prisma.service';
import { PrismaTestingHelper } from '@chax-at/transactional-prisma-testing';
import { Type } from '@nestjs/common';

export class IntegrationTestHelper {
  private prismaTestingHelper: PrismaTestingHelper<PrismaService>;
  private module: TestingModule;
  private prisma: PrismaService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly providers: Type<any>[]) {}

  async setup(): Promise<void> {
    const originalPrismaService = new PrismaService();
    this.prismaTestingHelper = new PrismaTestingHelper(originalPrismaService);
    this.prisma = this.prismaTestingHelper.getProxyClient();

    this.module = await Test.createTestingModule({
      providers: [
        ...this.providers,
        {
          provide: PrismaService,
          useValue: this.prisma,
        },
      ],
    }).compile();
  }

  async startTransaction(): Promise<void> {
    await this.prismaTestingHelper.startNewTransaction();
  }

  rollbackTransaction(): void {
    this.prismaTestingHelper.rollbackCurrentTransaction();
  }

  getService<T>(type: Type<T>): T {
    return this.module.get<T>(type);
  }

  getPrisma(): PrismaService {
    return this.prisma;
  }
}
