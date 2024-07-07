import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditAdminNavStylesService } from './edit.service';
import { EditAdminNavStylesArgs } from './dto/edit.args';

import { ShowCoreNav } from '../../../../nav/show/dto/show.obj';
import { AdminAuthGuards } from '../../../../../utils';

@Resolver()
export class EditAdminNavStylesResolver {
  constructor(private readonly service: EditAdminNavStylesService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async admin__core_styles__nav__edit(
    @Args() args: EditAdminNavStylesArgs,
  ): Promise<ShowCoreNav> {
    return this.service.edit(args);
  }
}
