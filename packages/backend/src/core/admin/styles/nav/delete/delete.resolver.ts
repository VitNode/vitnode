import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminNavStylesService } from './delete.service';

@Resolver()
export class DeleteAdminNavStylesResolver {
  constructor(private readonly service: DeleteAdminNavStylesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'styles',
    permission: 'can_manage_styles_nav',
  })
  async admin__core_styles__nav__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
