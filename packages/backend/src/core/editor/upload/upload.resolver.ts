import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UploadCoreEditorService } from './upload.service';
import { UploadCoreEditorArgs } from './dto/upload.args';

import { ShowCoreFiles } from '../../files/show/dto/show.obj';
import { AuthGuards, OptionalAuth } from '../../../utils';
import { CurrentUser, User } from '../../../decorators';

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
