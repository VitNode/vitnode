import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ShowTopicsForumsArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => Int, { nullable: true })
  forum_id: number | null;

  @Field(() => Int, { nullable: true })
  id: number | null;
}
