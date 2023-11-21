import { ArgsType, Field } from '@nestjs/graphql';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class CreateAdminGroupsArgs {
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];
}
