import { ArgsType, Field } from '@nestjs/graphql';

import { CreateAdminTermsSettingsArgs } from '../create/create.dto';

@ArgsType()
export class EditAdminTermsSettingsArgs extends CreateAdminTermsSettingsArgs {
  @Field(() => Number)
  id: number;
}
