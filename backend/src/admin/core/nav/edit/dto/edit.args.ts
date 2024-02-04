import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CreateAdminNavArgs } from '../../create/dto/create.args';

@ArgsType()
export class EditAdminNavArgs extends CreateAdminNavArgs {
  @Field(() => Int)
  id: number;
}
