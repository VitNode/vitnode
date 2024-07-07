import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateAdminNavStylesService } from './create.service';
import { CreateAdminNavStylesArgs } from './dto/create.args';

import { ShowCoreNav } from '../../../../nav/show/dto/show.obj';
import { AdminAuthGuards } from '../../../../../utils';

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
