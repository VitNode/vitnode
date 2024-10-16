import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser, User } from '../../../decorators';
import { AuthGuards } from '../../../utils';
import { DeleteCoreEditorArgs } from './delete.dto';
import { DeleteCoreEditorService } from './delete.service';

@Resolver()
export class DeleteCoreEditorResolver {
  constructor(private readonly service: DeleteCoreEditorService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_editor_files__delete(
    @CurrentUser() currentUser: User,
    @Args() args: DeleteCoreEditorArgs,
  ): Promise<string> {
    return this.service.delete(currentUser, args);
  }
}
