import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditAdminEditorStylesService } from './edit.service';
import { EditAdminEditorStylesArgs } from './dto/edit.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guard';
import { EditorShowCoreMiddleware } from '@/core/middleware/show/dto/show.obj';

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
