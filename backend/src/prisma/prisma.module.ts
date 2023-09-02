import { Global, Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { PrismaService } from './prisma.service';

registerEnumType(Prisma.SortOrder, {
  name: 'SortingDirectionEnum'
});

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
