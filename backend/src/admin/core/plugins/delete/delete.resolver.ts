import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminPluginsService } from './delete.service';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class DeleteAdminPluginsResolver {
  constructor(private readonly service: DeleteAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_plugins__admin__delete(): Promise<string> {
    return await this.service.delete();
  }
}
