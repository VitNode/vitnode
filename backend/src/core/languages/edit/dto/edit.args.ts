import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EditCoreLanguagesArgs {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  timezone: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;
}
