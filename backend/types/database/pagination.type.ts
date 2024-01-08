import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Int, { nullable: true })
  startCursor: number | null;

  @Field(() => Int, { nullable: true })
  endCursor: number | null;

  @Field(() => Number)
  totalCount: number;

  @Field(() => Number)
  count: number;
}
