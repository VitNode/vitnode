import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CreateAdminGroupsArgs } from '../create/create.dto';

@ArgsType()
export class EditAdminGroupsArgs extends CreateAdminGroupsArgs {
  @Field(() => Int)
  id: number;
}
