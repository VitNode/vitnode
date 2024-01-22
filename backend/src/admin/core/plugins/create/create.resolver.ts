import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateAdminPluginsService } from './create.service';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class CreateAdminPluginsResolver {
  constructor(private readonly service: CreateAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_plugins__admin__create(): Promise<string> {
    return await this.service.create();
  }
}
