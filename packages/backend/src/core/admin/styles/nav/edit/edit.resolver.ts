import { ShowCoreNav } from '@/core/nav/show/show.dto';
import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminNavStylesArgs } from './edit.dto';
import { EditAdminNavStylesService } from './edit.service';

@Resolver()
export class EditAdminNavStylesResolver {
  constructor(private readonly service: EditAdminNavStylesService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'styles',
    permission: 'can_manage_styles_nav',
  })
  async admin__core_styles__nav__edit(
    @Args() args: EditAdminNavStylesArgs,
  ): Promise<ShowCoreNav> {
    return this.service.edit(args);
  }
}
