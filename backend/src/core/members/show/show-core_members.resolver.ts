import { Args, Query, Resolver } from '@nestjs/graphql';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ShowCoreMembersService } from './show-core_members.service';
import { ShowCoreMembersObj } from './dto/show-core_members.obj';
import { ShowCoreMembersArgs } from './dto/show-core_members.args';

@Resolver()
export class ShowCoreMembersResolver {
  constructor(private readonly service: ShowCoreMembersService) {}

  @Query(() => ShowCoreMembersObj)
  async show_core_members(@Args() args: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    return await this.service.show(args);
  }
}
