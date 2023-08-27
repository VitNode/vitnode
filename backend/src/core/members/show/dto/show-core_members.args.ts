import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ShowCoreMembersArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int)
  first: number;
}
