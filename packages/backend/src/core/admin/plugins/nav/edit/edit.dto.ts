import { ArgsType, Field } from '@nestjs/graphql';

import { CreateAdminNavPluginsArgs } from '../create/create.dto';

@ArgsType()
export class EditCreateAdminNavPluginsArgs extends CreateAdminNavPluginsArgs {
  @Field(() => String)
  previous_code: string;
}
