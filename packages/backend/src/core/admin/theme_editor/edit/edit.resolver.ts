import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminThemeEditorArgs } from './edit.dto';
import { EditAdminThemeEditorService } from './edit.service';

@Resolver()
export class EditAdminThemeEditorResolver {
  constructor(private readonly service: EditAdminThemeEditorService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'styles',
    permission: 'can_manage_styles_theme-editor',
  })
  async admin__core_theme_editor__edit(
    @Args() args: EditAdminThemeEditorArgs,
  ): Promise<string> {
    return this.service.edit(args);
  }
}
