import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CreateAdminNavStylesArgs } from '../../create/dto/create.args';

@ArgsType()
export class EditAdminNavStylesArgs extends CreateAdminNavStylesArgs {
  @Field(() => Int)
  id: number;
}
