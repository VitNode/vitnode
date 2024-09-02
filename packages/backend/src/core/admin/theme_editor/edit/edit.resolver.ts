import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminThemeEditorArgs } from './edit.dto';
import { EditAdminThemeEditorService } from './edit.service';

@Resolver()
export class EditAdminThemeEditorResolver {
  constructor(private readonly service: EditAdminThemeEditorService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_theme_editor__edit(
    @Args() args: EditAdminThemeEditorArgs,
  ): Promise<string> {
    return this.service.edit(args);
  }
}
