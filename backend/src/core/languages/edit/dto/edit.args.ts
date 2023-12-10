import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditCoreLanguagesArgs {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  timezone: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;
}
