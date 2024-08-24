import { EditorShowCoreMiddleware } from '@/core/middleware/show/dto/show.obj';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminEditorStylesArgs } from './dto/edit.args';
import { EditAdminEditorStylesService } from './edit.service';

@Resolver()
export class EditAdminEditorStylesResolver {
  constructor(private readonly service: EditAdminEditorStylesService) {}

  @Mutation(() => EditorShowCoreMiddleware)
  @UseGuards(AdminAuthGuards)
  admin__core_styles__editor__edit(
    @Args() args: EditAdminEditorStylesArgs,
  ): EditorShowCoreMiddleware {
    return this.service.edit(args);
  }
}
