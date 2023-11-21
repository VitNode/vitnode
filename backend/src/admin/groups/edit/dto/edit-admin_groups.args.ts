import { ArgsType, Field } from '@nestjs/graphql';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class EditAdminGroupsArgs {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];
}
