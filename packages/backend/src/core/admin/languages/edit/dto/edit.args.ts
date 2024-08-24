import { ArgsType, Field, Int, OmitType } from '@nestjs/graphql';

import { CreateCoreAdminLanguagesArgs } from '../../create/dto/create.args';

@ArgsType()
export class EditCoreAdminLanguagesArgs extends OmitType(
  CreateCoreAdminLanguagesArgs,
  ['code'] as const,
) {
  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  id: number;
}
