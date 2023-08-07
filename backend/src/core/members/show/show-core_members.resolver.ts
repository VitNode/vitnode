import { Query, Resolver } from '@nestjs/graphql';

import { ShowCoreMembersService } from './show-core_members.service';

@Resolver()
export class ShowCoreMembersResolver {
  constructor(private readonly ShowCoreMembersService: ShowCoreMembersService) {}

  @Query(() => String)
  show_core_members(): string {
    return this.ShowCoreMembersService.show();
  }
}
