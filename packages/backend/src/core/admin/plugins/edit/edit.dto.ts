import { ArgsType, Field, OmitType } from '@nestjs/graphql';

import { CreateAdminPluginsArgs } from '../create/create.dto';

@ArgsType()
export class EditAdminPluginsArgs extends OmitType(CreateAdminPluginsArgs, [
  'code',
] as const) {
  @Field(() => String)
  code: string;

  @Field(() => Boolean, { nullable: true })
  default?: boolean;

  @Field(() => Boolean, { nullable: true })
  enabled?: boolean;
}
