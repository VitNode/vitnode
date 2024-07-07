import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminNavPluginsService } from './delete.service';
import { DeleteCreateAdminNavPluginsArgs } from './dto/delete.args';

import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';

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
