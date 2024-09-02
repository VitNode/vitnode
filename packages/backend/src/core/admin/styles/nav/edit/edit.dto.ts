import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CreateAdminNavStylesArgs } from '../create/create.dto';

@ArgsType()
export class EditAdminNavStylesArgs extends CreateAdminNavStylesArgs {
  @Field(() => Int)
  id: number;
}
