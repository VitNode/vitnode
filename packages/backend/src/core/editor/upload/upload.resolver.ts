import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser, User } from '../../../decorators';
import { AuthGuards, OptionalAuth } from '../../../utils';
import { ShowCoreFiles } from '../../files/show/dto/show.obj';
import { UploadCoreEditorArgs } from './dto/upload.args';
import { UploadCoreEditorService } from './upload.service';

@Resolver()
export class UploadCoreEditorResolver {
  constructor(private readonly service: UploadCoreEditorService) {}

  @Mutation(() => ShowCoreFiles)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async core_editor_files__upload(
    @Args() args: UploadCoreEditorArgs,
    @CurrentUser() currentUser?: User,
  ): Promise<ShowCoreFiles> {
    return this.service.upload(args, currentUser);
  }
}
