import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ShowCoreLanguagesArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;
}
