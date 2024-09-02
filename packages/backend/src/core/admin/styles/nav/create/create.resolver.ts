import { ShowCoreNav } from '@/core/nav/show/dto/show.obj';
import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateAdminNavStylesArgs } from './create.dto';
import { CreateAdminNavStylesService } from './create.service';

@Resolver()
export class CreateAdminNavStylesResolver {
  constructor(private readonly service: CreateAdminNavStylesService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async admin__core_styles__nav__create(
    @Args() args: CreateAdminNavStylesArgs,
  ): Promise<ShowCoreNav> {
    return this.service.create(args);
  }
}
