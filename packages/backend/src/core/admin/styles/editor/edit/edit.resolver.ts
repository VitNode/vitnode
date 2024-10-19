import { EditorShowCoreMiddleware } from '@/core/middleware/show/show.dto';
import {
  AdminAuthGuards,
  AdminPermission,
} from '@/utils/guards/admin-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminEditorStylesArgs } from './edit.dto';
import { EditAdminEditorStylesService } from './edit.service';

@Resolver()
export class EditAdminEditorStylesResolver {
  constructor(private readonly service: EditAdminEditorStylesService) {}

  @Mutation(() => EditorShowCoreMiddleware)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'styles',
    permission: 'can_manage_styles_editor',
  })
  admin__core_styles__editor__edit(
    @Args() args: EditAdminEditorStylesArgs,
  ): EditorShowCoreMiddleware {
    return this.service.edit(args);
  }
}
