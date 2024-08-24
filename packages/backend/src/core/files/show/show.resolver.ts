import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, User } from '../../../decorators';
import { AuthGuards } from '../../../utils';
import { ShowCoreFilesArgs } from './dto/show.args';
import { ShowCoreFilesObj } from './dto/show.obj';
import { ShowCoreFilesService } from './show.service';

@Resolver()
export class ShowCoreFilesResolver {
  constructor(private readonly service: ShowCoreFilesService) {}

  @Query(() => ShowCoreFilesObj)
  @UseGuards(AuthGuards)
  async core_files__show(
    @CurrentUser() currentUser: User,
    @Args() args: ShowCoreFilesArgs,
  ): Promise<ShowCoreFilesObj> {
    return this.service.show(currentUser, args);
  }
}
