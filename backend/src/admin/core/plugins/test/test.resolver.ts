import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { TestPluginsService } from './test.service';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class TestPluginsResolver {
  constructor(private readonly service: TestPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin_core_plugins__test(): Promise<string> {
    return await this.service.test2();
  }
}
