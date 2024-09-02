import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteCreateAdminNavPluginsArgs } from './delete.dto';
import { DeleteAdminNavPluginsService } from './delete.service';

@Resolver()
export class DeleteAdminNavPluginsResolver {
  constructor(private readonly service: DeleteAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__delete(
    @Args() args: DeleteCreateAdminNavPluginsArgs,
  ): string {
    return this.service.delete(args);
  }
}
