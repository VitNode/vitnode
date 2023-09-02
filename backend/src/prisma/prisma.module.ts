import { Global, Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

import { PrismaService } from './prisma.service';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

registerEnumType(SortDirectionEnum, {
  name: 'SortDirectionEnum'
});

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
