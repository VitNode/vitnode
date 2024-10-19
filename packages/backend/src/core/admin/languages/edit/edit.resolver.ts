import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowCoreLanguages } from '../../../languages/show/show.dto';
import { EditCoreAdminLanguagesArgs } from './edit.dto';
import { EditAdminCoreLanguagesService } from './edit.service';

@Resolver()
export class EditAdminCoreLanguagesResolver {
  constructor(private readonly service: EditAdminCoreLanguagesService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'languages',
    permission: 'can_manage_languages',
  })
  async admin__core_languages__edit(
    @Args() args: EditCoreAdminLanguagesArgs,
  ): Promise<ShowCoreLanguages> {
    return this.service.edit(args);
  }
}
