import { Query, Resolver } from '@nestjs/graphql';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ShowCoreMembersService } from './show-core_members.service';
import { ShowCoreMembersObj } from './dto/show-core_members.obj';

@Resolver()
export class ShowCoreMembersResolver {
  constructor(private readonly ShowCoreMembersService: ShowCoreMembersService) {}

  @Query(() => ShowCoreMembersObj)
  show_core_members(): ShowCoreMembersObj {
    return this.ShowCoreMembersService.show();
  }
}
