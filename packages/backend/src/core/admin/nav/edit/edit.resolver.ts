import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditAdminNavService } from './edit.service';
import { EditAdminNavArgs } from './dto/edit.args';

import { ShowCoreNav } from '../../../nav/show/dto/show.obj';
import { AdminAuthGuards } from '@/utils';

@Resolver()
export class EditAdminNavResolver {
  constructor(private readonly service: EditAdminNavService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav__edit(
    @Args() args: EditAdminNavArgs,
  ): Promise<ShowCoreNav> {
    return this.service.edit(args);
  }
}
